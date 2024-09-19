# CSCI6806capstone
CSCI6806_GRP6
This project aimed to develop a sophisticated sentiment analysis system specifically designed for food reviews, addressing limitations in existing methods. The primary objective was to improve sentiment classification accuracy and provide deeper insights into customer feedback by leveraging advanced data processing, machine learning, and visualization techniques.

The system employed a hybrid approach that combined classical machine learning models like Support Vector Machines (SVM) and Logistic Regression with deep learning frameworks such as TensorFlow and Keras. This allowed for the integration of both traditional text vectorization methods (TF-IDF, Word2Vec) and transformer-based models like BERT, which can capture complex linguistic patterns and contextual nuances in the text.

To handle large datasets and enhance processing efficiency, the project utilized Apache Spark for distributed data processing. The data preprocessing pipeline was enhanced with advanced techniques, including spelling correction, named entity recognition, and contextual lemmatization, ensuring high-quality data for model training.

For deployment, the system was containerized using Docker and orchestrated with Kubernetes, enabling scalability and reliability on cloud platforms like AWS and Azure. The solution also featured dynamic, interactive visualization dashboards created with Tableau and D3.js, offering rich, actionable insights through tools such as sentiment distribution graphs, trend analysis, and heatmaps.

This comprehensive approach provided businesses with a powerful framework to extract and visualize sentiment dynamics from food reviews, enhancing their ability to understand customer preferences and improve strategic decision-making.
