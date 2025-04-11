from flask import Flask, jsonify, request
from googletrans import Translator
from flask_cors import CORS
import asyncio

app = Flask(__name__)


CORS(app)

async def translate_to_thai(word):
    translator = Translator()
    translated = await translator.translate(word, src='en', dest='th')
    return translated.text

async def trans(word):
    translated_word = await translate_to_thai(word)
    return translated_word

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    word = data.get('word')
    
    if word:
        translated_word = asyncio.run(trans(word))
        return jsonify({'translated': translated_word})

if __name__ == "__main__":
    app.run(debug=True)
