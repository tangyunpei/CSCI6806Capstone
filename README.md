# CSCI6806capstone
CSCI6806_GRP6

# Enhanced Sentiment Analysis on Food Reviews with Advanced Text Vectorization, Data Cleaning, and Visualization Techniques

# Project Overview

This project aims to improve upon existing sentiment analysis methods applied to food reviews by incorporating advanced text vectorization, data cleaning, and visualization techniques. We specifically focus on enhancing the accuracy and interpretability of sentiment analysis models based on the Amazon Fine Food Reviews dataset.

# Original Paper Reference:

Bhatia, Tarandeep Kaur, and Puja Aggarwal. “Sentiment Analysis on Food Reviews Using Data Visualization Tools.” 2022 10th International Conference on Reliability, Infocom Technologies, and Optimization (Trends and Future Directions) (ICRITO). IEEE, 2022.
Link to Paper

The system employed a hybrid approach that combined classical machine learning models like Support Vector Machines (SVM) and Logistic Regression with deep learning frameworks such as TensorFlow and Keras. This allowed for the integration of both traditional text vectorization methods (TF-IDF, Word2Vec) and transformer-based models like BERT, which can capture complex linguistic patterns and contextual nuances in the text.

Technology Stack

	•	Programming Language: Python
	•	Libraries: NLTK, TextBlob, Scikit-learn, Matplotlib, Seaborn, Pandas
	•	Tools: Jupyter Notebook

To handle large datasets and enhance processing efficiency, the project utilized Apache Spark for distributed data processing. The data preprocessing pipeline was enhanced with advanced techniques, including spelling correction, named entity recognition, and contextual lemmatization, ensuring high-quality data for model training.

This comprehensive approach provided businesses with a powerful framework to extract and visualize sentiment dynamics from food reviews, enhancing their ability to understand customer preferences and improve strategic decision-making.


# SafeTensor file is splited please recombine
# Combine the split files into one

# SHA256
46781b3b2d3ec49d93343b0c0afa1eb02cda34416fc8e2a60ca60dfc1b4ed8a3  ./model/model.safetensors
44459a495af3558ba973fa000e8fe9dc686bbcb2b41d85d21f2c1158388d09e7  ./dataset/tokenizednews.zip
cat model_safetensors_part_* > model_safetensors_combined.safetensors

# Run Project
python3 app.py

# Or Build your own project in 
CSCI6806CapstoneFE
# Use Command
pnpm run build
