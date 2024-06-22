import functions as fn

def main():
    file_path = "Emprestimos2.xlsx"
    df = fn.carregar_dados(file_path)
    file_path2 = "PlanilhaDeLivros.xlsx"
    df2 = fn.carregar_dados2(file_path2)
    
    if df is None or df2 is None:
       print("Erro ao carregar os dados.")
       return
    
    print("Escolha o relatório que deseja visualizar:")
    print("1. Empréstimos por Ano")
    print("2. Top 10 Livros Mais Emprestados")
    print("3. Distribuição de Empréstimos por Série")
    print("4. Top 10 Autores Mais Emprestados")
    print("5. Top 10 Editoras Mais Emprestadas")
    print("6. Top 10 Usuários Mais Ativos")
    print("7. Empréstimos por Série ao Longo do Tempo")
    print("8. Tendência de Empréstimos ao Longo dos Anos")
    print("9. Top 10 Autores com Mais Livros")
    print("10. Top 10 Editoras com Mais Livros")
    print("11. Top 10 Gêneros com Mais Livros")
    
    choice = input("Digite o número da opção desejada: ")
    
    if choice == '1':
        fn.plot_emprestimos_por_ano(df)
    elif choice == '2':
        fn.plot_livros_mais_emprestados(df)
    elif choice == '3':
        fn.plot_emprestimos_por_serie(df)
    elif choice == '4':
        fn.plot_autores_mais_emprestados(df)
    elif choice == '5':
        fn.plot_editoras_mais_emprestadas(df)
    elif choice == '6':
        fn.plot_usuarios_mais_ativos(df)
    elif choice == '7':
        fn.plot_emprestimos_ano_serie(df)
    elif choice == '8':
        fn.plot_tendencia_emprestimos(df)
    elif choice == '9':
        fn.plot_livros_por_autor(df2)
    elif choice == '10':
        fn.plot_livros_por_editora(df2)
    elif choice == '11':
        fn.plot_livros_por_genero(df2)
    else:
        print("Opção inválida! Tente novamente.")

if __name__ == "__main__":
    main()