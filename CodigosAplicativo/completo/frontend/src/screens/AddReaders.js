import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';

export default function AddReaders() {
    const [formulario, setFormulario] = useState({
        nome: '',
        serie: '',
        matricula: '',
        idade: ''
    });

    const [mensagem, setMensagem] = useState('');

    const handleInputChange = (campo, valor) => {
        setFormulario({ ...formulario, [campo]: valor });
    };

    const handleSubmit = async () => {
        const bookData = {
            name: formulario.nome,
            registration: formulario.matricula,
            class: formulario.serie,
            age: parseInt(formulario.idade)
        };

        const apiUrl = 'http://192.168.100.30:8000/readers/create';

        try {
            const response = await axios.post(apiUrl, bookData);
            setMensagem(`Aluno(a) cadastrado com sucesso. ${bookData.name}`);

            setFormulario({
                nome: '',
                serie: '',
                matricula: '',
                idade: ''
            });
        } catch (error) {
            setMensagem(`Erro ao cadastrar o aluno: ${error.message}`);
        }
    };

    useEffect(() => {
        if (mensagem) {
            const timer = setTimeout(() => {
                setMensagem('');
            }, 4000);

            return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
        }
    }, [mensagem]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Cadastro de Alunos</Text>
                </View>
                {mensagem ? (
                    <View style={styles.mensagemContainer}>
                        <Text style={styles.mensagem}>{mensagem}</Text>
                    </View>
                ) : null}
                <View style={styles.CardEmprestimos}>
                    <Input
                        label="Aluno:"
                        placeholder="Digite o nome do aluno"
                        value={formulario.nome}
                        onChangeText={(valor) => handleInputChange('nome', valor)}
                    />
                    <Input
                        label="Série:"
                        placeholder="Digite a série do aluno"
                        value={formulario.serie}
                        onChangeText={(valor) => handleInputChange('serie', valor)}
                    />
                    <Input
                        label="Matricula:"
                        placeholder="Digite a matricula do aluno."
                        value={formulario.matricula}
                        onChangeText={(valor) => handleInputChange('matricula', valor)}
                    />
                    <Input
                        label="Idade:"
                        placeholder="Digite a idade do aluno"
                        keyboardType="numeric"
                        value={formulario.idade}
                        onChangeText={(valor) => handleInputChange('idade', valor)}
                    />
                    <View style={styles.form}>
                        <Button title="Cadastrar" onPress={handleSubmit} />
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
