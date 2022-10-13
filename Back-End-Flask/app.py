from flask import Flask, jsonify, request, io

app = Flask(__name__)

@app.route('/analyse', methods=['POST'])
def analyseVideo():
    print(request.json)
    
    Video = request.json

    req = request.post('http://localhost:4000/videos/sendVideo', json=Video)

    base64_video = req.content
    print(base64_video)

    Video = Video.open(io.BytesIO(base64_video))

    thread_video = open(Video)

    thread_video.start()

    thread_video.join()
    

    analysedVideo = thread_video.value
    
    return jsonify({
        'analysedVideo': analysedVideo,
    })

if __name__ == '__main__':
    app.run(debug = True, port = 5000)