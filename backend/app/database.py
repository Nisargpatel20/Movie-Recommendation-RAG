from datasets import load_dataset

def load_movie_dataset():
    dataset = load_dataset("MongoDB/embedded_movies", split="train")
    return dataset