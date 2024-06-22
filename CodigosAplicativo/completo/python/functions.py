import pandas as pd
import matplotlib.pyplot as plt
import os

def carregar_dados(file_path):
    full_path = os.path.join(os.path.dirname(__file__), file_path)
    try:
        df = pd.read_excel(full_path)
        df = df.dropna()
        df['ANO'] = pd.to_datetime(df['ANO'], format='%Y')
        return df
    except FileNotFoundError:
        print(f"Arquivo {full_path} não encontrado. Verifique o caminho e o nome do arquivo.")
        return None
    except Exception as e:
        print(f"Ocorreu um erro ao carregar o arquivo: {e}")
        return None
    
def carregar_dados2(file_path2):
    full_path2 = os.path.join(os.path.dirname(__file__), file_path2)
    try:    
        df = pd.read_excel(full_path2)
        df = df.dropna()
        return df
    except FileNotFoundError:
        print(f"Arquivo {full_path2} não encontrado. Verifique o caminho e o nome do arquivo.")
        return None
    except Exception as e:
        print(f"Ocorreu um erro ao carregar o arquivo: {e}")
        return None

def truncar_texto(texto, limite=10):
    if len(texto) > limite:
        return texto[:7] + "..."
    return texto

def plot_livros_por_autor(df):
    livros_por_autor = df['AUTOR'].value_counts().head(10)
    plt.figure(figsize=(10, 6))
    livros_por_autor.plot(kind='barh', color='skyblue')
    plt.title('Top 10 Autores com Mais Livros', fontsize=26, fontweight='bold')
    plt.xlabel('Quantidade de Livros')
    plt.ylabel('Autores')
    plt.gca().invert_yaxis()  # Para inverter a ordem e os maiores ficarem no topo
    return plt

def plot_livros_por_editora(df):
    livros_por_editora = df['EDITORA'].value_counts().head(10)
    plt.figure(figsize=(10, 6))
    livros_por_editora.plot(kind='barh', color='lightcoral')
    plt.title('Top 10 Editoras com Mais Livros', fontsize=26, fontweight='bold')
    plt.xlabel('Quantidade de Livros')
    plt.ylabel('Editoras')
    plt.gca().invert_yaxis()  # Para inverter a ordem e os maiores ficarem no topo
    return plt

def plot_livros_por_genero(df):
    livros_por_genero = df['GENERO'].value_counts().head(10)
    plt.figure(figsize=(10, 6))
    livros_por_genero.plot(kind='barh', color='mediumseagreen')
    plt.title('Top 10 Gêneros com Mais Livros', fontsize=26, fontweight='bold')
    plt.xlabel('Quantidade de Livros')
    plt.ylabel('Gêneros')
    plt.gca().invert_yaxis()  # Para inverter a ordem e os maiores ficarem no topo
    return plt

def truncar_texto(texto, limite=10):
    if len(texto) > limite:
        return texto[:7] + "..."
    return texto

def plot_generos_mais_quantidade(df):
    generos_quantidade = df.groupby('GENERO')['QTDE'].sum().sort_values(ascending=False).head(10)
    
    plt.figure(figsize=(10, 6))
    generos_quantidade.plot(kind='barh', color='mediumseagreen')
    
    plt.title('Top 10 Gêneros com Maior Quantidade de Livros', fontsize=26, fontweight='bold')
    plt.xlabel('Quantidade de Livros')
    plt.ylabel('Gêneros')
    plt.gca().invert_yaxis() 

    return plt

def plot_editoras_mais_quantidade(df):
    editoras_quantidade = df.groupby('EDITORA')['QTDE'].sum().sort_values(ascending=False).head(10)
    
    plt.figure(figsize=(10, 6))
    editoras_quantidade.plot(kind='barh', color='lightcoral')
    
    plt.title('Top 10 Editoras com Maior Quantidade de Livros', fontsize=26, fontweight='bold')
    plt.xlabel('Quantidade de Livros')
    plt.ylabel('Editoras')
    plt.gca().invert_yaxis() 

    return plt
def plot_autores_mais_quantidade(df):
    autores_quantidade = df.groupby('AUTOR')['QTDE'].sum().sort_values(ascending=False).head(10)
    
    plt.figure(figsize=(10, 6))
    autores_quantidade.plot(kind='barh', color='skyblue')
    
    plt.title('Top 10 Autores com Maior Quantidade de Livros', fontsize=26, fontweight='bold')
    plt.xlabel('Quantidade de Livros')
    plt.ylabel('Autores')
    plt.gca().invert_yaxis()

    return plt

def plot_top_livros_mais_quantidade(df, top_n=10):

    top_livros = df[['LIVRO', 'QTDE']].sort_values(by='QTDE', ascending=False).head(top_n)
    
    plt.figure(figsize=(10, 8))
    plt.barh(top_livros['LIVRO'], top_livros['QTDE'], color='skyblue')
    plt.gca().invert_yaxis()
    plt.title(f'Top {top_n} Livros com Maior Quantidade', fontsize=26, fontweight='bold')
    plt.xlabel('Quantidade')
    plt.ylabel('Título do Livro')
    
    for index, value in enumerate(top_livros['QTDE']):
        plt.text(value, index, str(value))
    
    plt.show()

def plot_emprestimos_por_ano(df):
    emprestimos_por_ano = df['ANO'].dt.year.value_counts().sort_index()
    plt.figure(figsize=(10, 6))
    emprestimos_por_ano.plot(kind='bar', color = 'teal')
    plt.title('Empréstimos por Ano', fontsize=26, fontweight='bold')
    plt.ylabel('Número de Empréstimos')
    return plt

def plot_livros_mais_emprestados(df):
    livros_mais_emprestados = df['LIVRO'].value_counts().head(10)
    plt.figure(figsize=(8, 6))
    livros_mais_emprestados.plot(kind='barh', color='teal')
    plt.gca().set_title('Top 10 Livros Mais Emprestados', fontsize=26, fontweight='bold')  # Ajustando o tamanho do título
    plt.yticks(range(len(livros_mais_emprestados.index)), [truncar_texto(livro) for livro in livros_mais_emprestados.index])
    plt.xlabel('Número de Empréstimos')
    plt.ylabel('Nome do Livro')
    return plt


def plot_emprestimos_por_serie(df):
    emprestimos_por_serie = df['SERIE'].value_counts()
    plt.figure(figsize=(10, 6))
    cores = ['LightSkyBlue', 'DodgerBlue', 'Gainsboro']  # Definindo cores azul, vermelho e verde
    emprestimos_por_serie.plot(kind='bar', color=cores)
    plt.gca().set_title('Distribuição de Empréstimos por Série', fontsize=26, fontweight='bold')
    plt.ylabel('Número de Empréstimos')
    return plt

def plot_autores_mais_emprestados(df):
    autores_mais_emprestados = df['AUTOR'].value_counts().head(10)
    plt.figure(figsize=(10, 8))  # Ajustando o tamanho da figura
    autores_mais_emprestados.sort_values().plot(kind='barh', color='teal')  # Usando plot horizontal
    plt.gca().invert_yaxis()  # Invertendo a ordem para colocar o autor mais emprestado no topo
    plt.gca().set_title('Top 10 Autores Mais Emprestados', fontsize=26, fontweight='bold')
    plt.yticks(range(len(autores_mais_emprestados.index)), [truncar_texto(livro) for livro in autores_mais_emprestados.index])
    plt.xlabel('Número de Empréstimos')
    plt.ylabel('Nome do Autor')
    return plt

def plot_editoras_mais_emprestadas(df):
    editoras_mais_emprestadas = df['EDITORA'].value_counts().head(10)
    fig, ax = plt.subplots(figsize=(10, 8))  # Define o tamanho da figura
    editoras_mais_emprestadas.sort_values().plot(kind='barh', ax=ax, color='teal')
    ax.set_title('Top 10 Editoras Mais Emprestadas', fontsize=20, fontweight='bold')
    ax.set_xlabel('Número de Empréstimos', fontsize=14)
    ax.set_ylabel('Nome da Editora', fontsize=14)
    plt.yticks(range(len(editoras_mais_emprestadas.index)), [truncar_texto(livro) for livro in editoras_mais_emprestadas.index])
    return plt

def plot_usuarios_mais_ativos(df):
    usuarios_mais_ativos = df['NOME'].value_counts().head(10)
    plt.figure(figsize=(10, 8))  # Ajustando o tamanho da figura
    usuarios_mais_ativos.sort_values().plot(kind='barh', color='teal')  # Usando plot horizontal
    plt.gca().invert_yaxis()  # Invertendo a ordem para colocar o usuário mais ativo no topo
    plt.gca().set_title('Top 10 Usuários Mais Ativos', fontsize=26, fontweight='bold')
    plt.yticks(range(len(usuarios_mais_ativos.index)), [truncar_texto(livro) for livro in usuarios_mais_ativos.index])
    plt.xlabel('Número de Empréstimos')
    plt.ylabel('Nome do Usuário')
    return plt

def plot_emprestimos_por_mes(df):
    df['MES'] = df['ANO'].dt.month
    emprestimos_por_mes = df['MES'].value_counts().sort_index()
    emprestimos_por_mes.index = emprestimos_por_mes.index.map({
        1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril', 5: 'Maio', 6: 'Junho',
        7: 'Julho', 8: 'Agosto', 9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro'
    })
    plt.figure(figsize=(12, 6))
    emprestimos_por_mes.plot(kind='bar')
    plt.gca().set_title('Empréstimos por Mês', fontsize=26, fontweight='bold')
    plt.xlabel('Mês')
    plt.ylabel('Número de Empréstimos')
    return plt

def plot_emprestimos_ano_serie(df):
    emprestimos_ano_serie = df.groupby([df['ANO'].dt.year, 'GRAU']).size().unstack().fillna(0)
    plt.figure(figsize=(12, 8))
    cores = ['LightSkyBlue', 'DodgerBlue', 'Gainsboro']
    emprestimos_ano_serie.plot(kind='bar', color = cores)
    plt.gca().set_title('Empréstimos por Série ao Longo do Tempo', fontsize=20, fontweight='bold')
    plt.xlabel('Ano')
    plt.ylabel('Número de Empréstimos')
    return plt

def plot_editora_autor_correlation(df):
    editora_autor_cross = pd.crosstab(df['EDITORA'], df['AUTOR'])
    plt.figure(figsize=(12, 8))
    plt.imshow(editora_autor_cross, cmap='viridis', aspect='auto')
    plt.colorbar()
    plt.xticks(ticks=range(len(editora_autor_cross.columns)), labels=editora_autor_cross.columns, rotation=90)
    plt.yticks(ticks=range(len(editora_autor_cross.index)), labels=editora_autor_cross.index)
    plt.gca().set_title('Relação entre Editoras e Autores', fontsize=26, fontweight='bold')
    plt.xlabel('Autores')
    plt.ylabel('Editoras')
    return plt

def plot_tendencia_emprestimos(df):
    emprestimos_ano = df['ANO'].dt.year.value_counts().sort_index()
    plt.figure(figsize=(10, 6))
    emprestimos_ano.plot(kind='line', marker='o', color='teal')
    plt.gca().set_title('Tendência de Empréstimos ao Longo dos Anos', fontsize=26, fontweight='bold')
    plt.xlabel('Ano')
    plt.ylabel('Número de Empréstimos')
    return plt