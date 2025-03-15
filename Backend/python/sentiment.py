import sys
import nltk
import json
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Ensure vader_lexicon is downloaded
try:
    nltk.data.find('vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon')

# Initialize the analyzer
analyzer = SentimentIntensityAnalyzer()


def analyze_sentiment(text):
    return analyzer.polarity_scores(text)


def classify_sentiment(compound_score):
    if compound_score >= 0.05:
        return "Positive"
    elif compound_score <= -0.05:
        return "Negative"
    else:
        return "Neutral"


# Get the input text from command line arguments
text = sys.argv[1]

# Analyze sentiment and classify it
result = analyze_sentiment(text)
compound_score = result['compound']
sentiment_label = classify_sentiment(compound_score)

# Add the label to the result and send it as JSON
result["sentiment"] = sentiment_label

# Output the result as JSON
print(json.dumps(result))
