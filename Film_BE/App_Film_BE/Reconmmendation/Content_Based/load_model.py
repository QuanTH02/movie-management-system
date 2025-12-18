import joblib
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import os

# Get the directory of this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Specify the path to the directory containing the model files
model_dir = os.path.join(BASE_DIR, 'model')

# Load the model files with error handling
try:
    tfidf_vectorizer = joblib.load(os.path.join(model_dir, 'tfidf_vectorizer.pkl'))
    tfidf_matrix = joblib.load(os.path.join(model_dir, 'tfidf_matrix.pkl'))
    movie_df = joblib.load(os.path.join(model_dir, 'movie_df.pkl'))
    cosine_sim = joblib.load(os.path.join(model_dir, 'cosine_sim.pkl'))
    MODELS_LOADED = True
except FileNotFoundError as e:
    print(f"Warning: Model files not found: {e}")
    MODELS_LOADED = False
    tfidf_vectorizer = None
    tfidf_matrix = None
    movie_df = None
    cosine_sim = None


def recommend_content_based_by_movie_id(movie_id, cosine_sim=cosine_sim):
    if not MODELS_LOADED:
        return []
    
    try:
        idx = movie_df[movie_df['movie_id'] == movie_id].index[0]
        
        sim_scores = list(enumerate(cosine_sim[idx]))
        
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        
        sim_scores = sim_scores[1:11]
        
        movie_indices = [i[0] for i in sim_scores]
        
        return movie_df['movie_id'].iloc[movie_indices].tolist()
    except (IndexError, KeyError) as e:
        print(f"Error in recommendation: {e}")
        return []

if __name__ == '__main__':
    recommendations = recommend_content_based_by_movie_id(6)
    print(recommendations)
