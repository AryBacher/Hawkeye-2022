from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/analyse', methods=['POST'])
def analyseVideo():
    print(request.json)
    #Recibo el json enviado por node que contiene la ruta de la imagen
    Video = request.json

    #Hago una petición post a una ruta del back-end que recibe una ruta de una imagen y devuelve la misma. 
    #Por supuesto, en este caso estoy enviando la ruta de la imagen antes recibida
    req = requests.post('http://localhost:4000/videos/sendVideo', json=Video)

    #Recibo la imagen en base64
    base64_video = req.content
    print(base64_video)

    #Convierto la información a bytes y la abro con pillow
    Video = Image.open(io.BytesIO(base64_video))

    #Llamo la clase que me permite ejecutar la función del modelo de cnn que me permite predecir si la imagen tiene tuberculosis o no
    #Además le paso como paraámetro la imagen
    thread_video = CustomThreadCnn(Video)

    #Ejercuto el thread de cnn
    thread_video.start()

    #Cierro el Thread de cnn
    thread_video.join()
    

    analysedVideo = thread_video.value
    
    return jsonify({
        'analysedVideo': analysedVideo,
    })

if __name__ == '__main__':
    app.run(debug = True, port = 5000)