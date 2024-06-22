# app.py
from flask import Flask, jsonify, request, send_file
import functions as fn
import io
import pandas as pd

app = Flask(__name__)

@app.route("/")
def index():
    return jsonify({
        "message": "Welcome to the Library Analytics API",
        "endpoints": [
            "/emprestimos_por_ano",
            "/livros_mais_emprestados",
            "/emprestimos_por_serie",
            "/autores_mais_emprestados",
            "/editoras_mais_emprestadas",
            "/usuarios_mais_ativos",
            "/emprestimos_ano_serie",
            "/tendencia_emprestimos",
            "/generos_mais_quantidade",
            "/livros_por_editora",
            "/livros_por_genero"
        ]
    })

@app.route("/livros_por_autor")
def livros_por_autor():
    df = load_data2()
    img = fn.plot_livros_por_autor(df)
    return send_image(img)

@app.route("/livros_por_editora")
def livros_por_editora():
    df = load_data2()
    img = fn.plot_livros_por_editora(df)
    return send_image(img)

@app.route("/livros_por_genero")
def livros_por_genero():
    df = load_data2()
    img = fn.plot_livros_por_genero(df)
    return send_image(img)

@app.route("/generos_mais_quantidade")
def generos_mais_quantidade():
    print("Request received for /generos_mais_quantidade")
    df = load_data2()
    if df is not None:
        img = fn.plot_generos_mais_quantidade(df)
        return send_image(img)
    
@app.route("/emprestimos_por_ano")
def emprestimos_por_ano():
    print("Request received for /emprestimos_por_ano")
    df = load_data()
    img = fn.plot_emprestimos_por_ano(df)
    return send_image(img)

@app.route("/editoras_quantidade")
def editoras_quantidade():
    print("Request received for /editoras_quantidade")
    df = load_data2()
    if df is not None:
        img = fn.plot_editoras_mais_quantidade(df)
        return send_image(img)
@app.route("/autores_mais_quantidade")
def autores_mais_quantidade():
    print("Request received for /autores_mais_quantidade")
    df = load_data2()
    if df is not None:
        img = fn.plot_autores_mais_quantidade(df)
        return send_image(img)
    
@app.route("/top_livros")
def top_livros():
    print("Request received for /top_livros")
    df = load_data2()
    img = fn.plot_top_livros_mais_quantidade(df)
    return send_image(img)

@app.route("/livros_mais_emprestados")
def livros_mais_emprestados():
    df = load_data()
    img = fn.plot_livros_mais_emprestados(df)
    return send_image(img)

@app.route("/emprestimos_por_serie")
def emprestimos_por_serie():
    df = load_data()
    img = fn.plot_emprestimos_por_serie(df)
    return send_image(img)

@app.route("/autores_mais_emprestados")
def autores_mais_emprestados():
    df = load_data()
    img = fn.plot_autores_mais_emprestados(df)
    return send_image(img)

@app.route("/editoras_mais_emprestadas")
def editoras_mais_emprestadas():
    df = load_data()
    img = fn.plot_editoras_mais_emprestadas(df)
    return send_image(img)

@app.route("/usuarios_mais_ativos")
def usuarios_mais_ativos():
    df = load_data()
    img = fn.plot_usuarios_mais_ativos(df)
    return send_image(img)

@app.route("/emprestimos_ano_serie")
def emprestimos_ano_serie():
    df = load_data()
    img = fn.plot_emprestimos_ano_serie(df)
    return send_image(img)

@app.route("/tendencia_emprestimos")
def tendencia_emprestimos():
    df = load_data()
    img = fn.plot_tendencia_emprestimos(df)
    return send_image(img)

def load_data():
    file_path = "Emprestimos2.xlsx"
    return fn.carregar_dados(file_path)

def load_data2():
    file_path2 = "PlanilhaDeLivros.xlsx"
    return fn.carregar_dados2(file_path2)

def send_image(img):
    img_io = io.BytesIO()
    img.savefig(img_io, format="png")
    img_io.seek(0)
    return send_file(img_io, mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')