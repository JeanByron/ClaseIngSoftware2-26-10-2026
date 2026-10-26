from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/example")
def example():
    return jsonify({
         "mensaje": "Hola desde la API del contenedor"
})

app.run(host="0.0.0.0", port=5006)