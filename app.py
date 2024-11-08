from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from transformers import PegasusTokenizer, PegasusForConditionalGeneration
import torch

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Initialize model and tokenizer
model_path = './fine-tuned-pegasus/model'
tokenizer_path = './fine-tuned-pegasus/tokenizer'
if torch.backends.mps.is_available():
    device = torch.device('mps')
else:
    device = torch.device('cpu')

tokenizer = PegasusTokenizer.from_pretrained(tokenizer_path)
model = PegasusForConditionalGeneration.from_pretrained(model_path).to(device)

# Define maximum token length
max_token_length = 256

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/get_summarize", methods=["POST", "OPTIONS"])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
def get_summarize():
    # Log request headers for debugging
    print("Request Headers:", request.data)
    
    if request.method == "OPTIONS":
        response = jsonify({"status": "OK"})
        response.headers.add("Access-Control-Allow-Origin", "https://localdealmarket.com")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization,current-session")
        response.headers.add("Access-Control-Allow-Methods", "POST,OPTIONS")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers['Connection'] = 'close'
        return response, 200
    
    if not request.is_json:
        response = jsonify({"error": "Invalid JSON"})
        response.headers['Connection'] = 'close'
        return response, 400
    
    data = request.get_json()
    input_string = data.get("input_string", "")
    
    if not input_string:
        response = jsonify({"message": "Missing input"})
        response.headers['Connection'] = 'close'
        return response, 200

    # 对文章进行分段
    inputs = tokenizer(input_string, return_tensors="pt", padding="max_length", max_length=256)
    input_ids = inputs['input_ids'][0].tolist()  # 转换为列表，方便切片操作

    # 分割文章：每次取 max_token_length 长度的部分
    chunks = [input_ids[i:i + max_token_length] for i in range(0, len(input_ids), max_token_length)]

    # 定义一个函数来生成每段的摘要
    def generate_summary(input_ids_chunk):
        inputs_chunk = {"input_ids": torch.tensor([input_ids_chunk]).to(device)}
        summary_ids = model.generate(
            inputs_chunk['input_ids'],
            max_length=400,
            min_length=150,
            length_penalty=2.0,
            num_beams=8,
            early_stopping=True,
        )
        summary_string = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary_string

    # 对每一部分生成摘要
    summaries = [generate_summary(chunk) for chunk in chunks]

    # 最终的汇总摘要
    final_summary = " ".join(summaries)


    # Simple summarization logic (for demonstration purposes)
    summary = {
        "original_length": len(input_string),
        "summary": final_summary  # Truncate to the first 100 characters
    }

    #actual code
    
    response_body = {
        "code": '200',
        "message": "OK",
        "finished_process": True,
        "data": summary
    }
    
    response = jsonify(response_body)
    response.headers['Connection'] = 'keep-alive'
    return response, 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)
