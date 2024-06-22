import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, TextInput, Button } from 'react-native';
import { Input } from 'react-native-elements';
import CadEmprestimos from '../components/Cards/CadEmprestimos';
import axios from 'axios';

export default function Home() {
  const [cadastro, setCadastro] = useState(false);
  const [formulario, setFormulario] = useState({
    nome: '',
    livro: '',
    matricula: ''
  });
  const [mensagem, setMensagem] = useState('');

  const handleInputChange = (campo, valor) => {
    setFormulario({ ...formulario, [campo]: valor });
  };

  const onClickCad = () => {
    setCadastro(true);
  };

  const handleSubmit = async () => {
    const bookData = {
      name_book: formulario.livro,
      id_reader: formulario.matricula,
      name_reader: formulario.nome,
      status: 1
    };

    console.log(bookData);

    const apiUrl = 'http://192.168.100.30:8000/reserves/create';

    try {
      const response = await axios.post(apiUrl, bookData);
      setMensagem(`Aluno(a) cadastrado com sucesso. ${bookData.name}`);

      setFormulario({
        nome: '',
        livro: '',
        matricula: ''
      });

      setTimeout(() => {
        setCadastro(false);
      }, 5000);
      
    } catch (error) {
      setMensagem(`Erro ao cadastrar o aluno: ${error.message}`);
    }
  };

  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        setMensagem('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  return (
    <View style={styles.container}>
      <View style={styles.CardEmprestimos}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Cadastro de Reservas</Text>
        </View>
        {!cadastro ? (
          <View style={styles.form}>
            <Button title="Cadastrar" onPress={onClickCad} />
          </View>
        ) : null}
        {mensagem ? (
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagem}>{mensagem}</Text>
          </View>
        ) : null}
        {cadastro ? (
          <View>
            <Input
              label="Aluno:"
              placeholder="Digite o nome do aluno"
              value={formulario.nome}
              onChangeText={(valor) => handleInputChange('nome', valor)}
            />
            <Input
              label="Matricula:"
              placeholder="Digite a matricula do aluno"
              value={formulario.matricula}
              onChangeText={(valor) => handleInputChange('matricula', valor)}
            />
            <Input
              label="Livro:"
              placeholder="Digite o nome do livro"
              value={formulario.livro}
              onChangeText={(valor) => handleInputChange('livro', valor)}
            />
            <View style={styles.form}>
              <Button title="Cadastrar" onPress={handleSubmit} />
            </View>
          </View>
        ) : null}
      </View>
      <View>
        <CadEmprestimos />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A89FF',
    paddingBottom: 50,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    paddingTop: '2%',
  },
  bottomContainer2: {
    width: '100%',
    height: height * 0.1, // 15% of screen height
    backgroundColor: 'gray',
  },
  textoBranco: {
    marginTop: 20,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoAzulEscuro: {
    color: '#292937',
    fontWeight: 'bold',
  },
  slideBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#3A89FF',
    zIndex: 10,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  BotaoCad: {
    backgroundColor: '#69A5FF',
    padding: 10,
    borderRadius: 10,
    marginBottom: '3%',
  },
  BotaoCadCancelar: {
    backgroundColor: '#d14438',
    padding: 10,
    borderRadius: 10,
    marginBottom: '3%',
  },
  BotaoCadTexto: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slideCard: {
    borderRadius: 15,
    marginRight: 10,
    width: 150,
    height: 190,
  },
  EspacoCadastro: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    marginTop: '5%',
    borderRadius: 15,
  },
  TextoCad: {
    marginLeft: 10,
  },
  InfosCad: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  allBooksContainer: {
    flex: 1,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    width: '100%',
  },
  CardEmprestimos: {
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    padding: 15,
    marginBottom: 20,
  },
  form: {
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 10,
    opacity: 0.8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16
  },
  mensagemContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  mensagem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});
