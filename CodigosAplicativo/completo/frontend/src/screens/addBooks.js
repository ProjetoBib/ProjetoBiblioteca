import React, { useState , useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';

export default function AddBook() {
    const [formulario, setFormulario] = useState({
        nome: '',
        autor: '',
        editora: '',
        genero: '',
        tombo: '',
        qtd: '',
    });

    const [mensagem, setMensagem] = useState('');

    const handleInputChange = (campo, valor) => {
        setFormulario({ ...formulario, [campo]: valor });
    };

    const handleSubmit = async () => {
        const bookData = {
            title: formulario.nome,
            author: formulario.autor,
            pubComp: formulario.editora,
            genre: formulario.genero,
            quantity: parseInt(formulario.qtd)
        };

        const apiUrl = 'http://192.168.100.30:8000/books/create';

        try {
            const response = await axios.post(apiUrl, bookData);
            setMensagem(`Livro cadastrado com sucesso: ${bookData.title}`);

            setFormulario({
                nome: '',
                autor: '',
                editora: '',
                genero: '',
                tombo: '',
                qtd: '',
            })
        } catch (error) {
            setMensagem(`Erro ao cadastrar o livro: ${error.message}`);
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
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Cadastro de Livros</Text>
                </View>
                {mensagem ? (
                    <View style={styles.mensagemContainer}>
                        <Text style={styles.mensagem}>{mensagem}</Text>
                    </View>
                ) : null}
                <View style={styles.CardEmprestimos}>
                    <Input
                        label="Livro:"
                        placeholder="Digite o nome"
                        value={formulario.nome}
                        onChangeText={(valor) => handleInputChange('nome', valor)}
                    />
                    <Input
                        label="Autor:"
                        placeholder="Digite o autor"
                        value={formulario.autor}
                        onChangeText={(valor) => handleInputChange('autor', valor)}
                    />
                    <Input
                        label="Editora:"
                        placeholder="Digite a editora"
                        value={formulario.editora}
                        onChangeText={(valor) => handleInputChange('editora', valor)}
                    />
                    <Input
                        label="Gênero:"
                        placeholder="Digite o gênero do livro"
                        value={formulario.genero}
                        onChangeText={(valor) => handleInputChange('genero', valor)}
                    />
                    <Input
                        label="Quantidade:"
                        placeholder="Digite a quantidade de exemplares"
                        keyboardType="numeric"
                        value={formulario.qtd}
                        onChangeText={(valor) => handleInputChange('qtd', valor)}
                    />
                    <View style={styles.form}>
                        <Button buttonStyle={styles.btn} title="Cadastrar" onPress={handleSubmit} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3A89FF',
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
        marginBottom: 60,
    },
    btn: {
        backgroundColor: "white",
        borderRadius: 10,
        opacity: 0.8,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#E6E6E6",
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
