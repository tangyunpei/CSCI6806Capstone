from transformers import Seq2SeqTrainer, Seq2SeqTrainingArguments, PegasusTokenizer, PegasusForConditionalGeneration
import torch
from datasets import load_from_disk
# Load previous trainer state (optional, if you want to monitor or print the state)

if torch.backends.mps.is_available():
    device = torch.device('mps')
else:
    device = torch.device('cpu')
# model_name = 'google/pegasus-cnn_dailymail'
model_name = './pegasus-cnn_dailymail'
# dataset = load_dataset("argilla/cnn-dailymail-summaries")
tokenized_datasets = load_from_disk('./dataset/tokenized_news')
# Split datasets
train_dataset = tokenized_datasets['train']
eval_dataset = tokenized_datasets['validation']

tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(
    model_name
).to(device)


# Training arguments (remain unchanged)
training_args = Seq2SeqTrainingArguments(
    output_dir='./results',
    eval_strategy='epoch',
    learning_rate=5e-5,
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    weight_decay=0.01,
    save_total_limit=3,
    num_train_epochs=1,  # This should remain the same
    predict_with_generate=True,
    fp16=False,
    dataloader_pin_memory=False,
)

# Initialize the model, dataset, and trainer
trainer = Seq2SeqTrainer(
    model=model,  # Ensure you have your model loaded here
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    tokenizer=tokenizer,
)

# Path to the last saved checkpoint (from 'trainer_state.json')
checkpoint_path = './results/checkpoint-129000'

# Resume training from the checkpoint
trainer.train(resume_from_checkpoint=checkpoint_path)

# Optional: Save the final model and tokenizer again after the resumed training
trainer.save_model('./results/yoo/final_model')
tokenizer.save_pretrained('./results/yoo/final_tokenizer')