from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/analyse', methods=['POST'])
def analyseVideo():
    print(request.json)
    
    Video = request.json

    
    req = request.post('http://localhost:4000/AnalysedVideo')

    
    return jsonify({
        'analysis': analysedVideo
    })

if __name__ == '__main__':
    app.run(debug = True, port = 5000)