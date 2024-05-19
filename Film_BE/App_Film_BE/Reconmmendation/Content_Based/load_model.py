import joblib
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import os
import joblib
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import os

# Specify the absolute path to the directory containing the model files
model_dir = 'F:\\Quan_Hoc\\2023.1\\GR1\\movie-management-system\\movie-management-system\\Film_BE\\App_Film_BE\\Reconmmendation\\Content_Based\\model\\'

# Load the model files
tfidf_vectorizer = joblib.load(os.path.join(model_dir, 'tfidf_vectorizer.pkl'))
tfidf_matrix = joblib.load(os.path.join(model_dir, 'tfidf_matrix.pkl'))
movie_df = joblib.load(os.path.join(model_dir, 'movie_df.pkl'))
cosine_sim = joblib.load(os.path.join(model_dir, 'cosine_sim.pkl'))
# Specify the absolute path to the directory containing the model files


def recommend_content_based_by_movie_id(movie_id, cosine_sim=cosine_sim):
    idx = movie_df[movie_df['movie_id'] == movie_id].index[0]
    
    sim_scores = list(enumerate(cosine_sim[idx]))
    
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    sim_scores = sim_scores[1:11]
    
    movie_indices = [i[0] for i in sim_scores]
    
    return movie_df['movie_id'].iloc[movie_indices].tolist()

# recommendations = recommend_content_based_by_movie_id(2)
# print(recommendations)
