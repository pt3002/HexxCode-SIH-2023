from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS  
 
app = Flask(__name__)
CORS(app)

@app.route('/api/ml1', methods=["POST"])
def getData():


    data = request.get_json('resume_txt')
    print(data)
    JD_txt = data["JD_txt"]
    print(JD_txt)
    resume_txt = data["resume_txt"]
    # print(request.get_json())
    # print(request.get_json())
    print(resume_txt)
    content = [JD_txt,resume_txt]
    print(content)

    cv = CountVectorizer()

    matrix = cv.fit_transform(content)

    similarity_matrix =  cosine_similarity(matrix)

    match = similarity_matrix[0][1] * 100
    print(match)
    return jsonify({ 'match': match})
    # return jsonpickle.encode(match)

@app.route('/api/ml')
def getResult():
    return "Hello"

if __name__ == "__main__":
    app.run(debug=True)

 