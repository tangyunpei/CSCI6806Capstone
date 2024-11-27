import torch
import tensorflow as tf
from datasets import load_dataset, load_from_disk
import accelerate
from transformers import (
    PegasusTokenizer,
    PegasusForConditionalGeneration,
    Seq2SeqTrainingArguments,
    Seq2SeqTrainer
)
# check if GPU is available on mac device
if torch.backends.mps.is_available():
    device = torch.device('mps')
else:
    device = torch.device('cpu')
#online address for model
model_name = 'google/pegasus-cnn_dailymail'
#local address for model
#model_name = './pegasus-cnn_dailymail'

#load dataset
dataset = load_dataset("argilla/cnn-dailymail-summaries")
#load tokenized datasets
#tokenized_datasets = load_from_disk('./dataset/tokenized_news')

print(dataset)
split_dataset = dataset['train'].train_test_split(test_size=0.1, shuffle=True, seed=42)

# rename keys for data set
split_dataset['validation'] = split_dataset.pop('test')

# load tokenizer and model
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(
    model_name
).to(device)

# Preprocess function
def preprocess_function(examples):
    inputs = examples['article']
    targets = examples['summary']
    model_inputs = tokenizer(inputs, max_length=1024, truncation=True, padding='max_length')

    with tokenizer.as_target_tokenizer():
        labels = tokenizer(targets, max_length=128, truncation=True, padding='max_length')

    model_inputs['labels'] = labels['input_ids']
    return model_inputs

# Tokenize datasets
tokenized_datasets = split_dataset.map(preprocess_function, batched=True)

# Split datasets
train_dataset = tokenized_datasets['train']
eval_dataset = tokenized_datasets['validation']
# Set up training arguments
training_args = Seq2SeqTrainingArguments(
    output_dir='./results',
    eval_strategy='epoch',
    learning_rate=5e-5,
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    weight_decay=0.01,
    save_total_limit=3,
    num_train_epochs=3,
    predict_with_generate=True,
    fp16=False,
    dataloader_pin_memory=False,
)

# Initialize trainer
trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    tokenizer=tokenizer,
)

# Path to the last saved checkpoint (from 'trainer_state.json')
#checkpoint_path = './results/checkpoint-129000'
#begin training
trainer.train()
# Resume training from the checkpoint
#trainer.train(resume_from_checkpoint=checkpoint_path)

# Save the model
trainer.save_model('./results/fine-tuned-pegasus')
tokenizer.save_pretrained('./results/fine-tuned-pegasus')