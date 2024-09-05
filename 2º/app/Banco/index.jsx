import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Image, Alert, Modal } from 'react-native';

const App = () => {
  const [number, setNumber] = useState(7320.92);
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saldoAtual, setSaldoAtual] = useState(number);
  const [saldoFuturo, setSaldoFuturo] = useState(0);

  const confirmarTransacao = () => {
    setNumber(saldoFuturo);
    setShowModal(false);
  };
  
  const cancelarTransacao = () => {
    setNumber(saldoAtual);
    setShowModal(false);
  };

  const mostrarModal = (tipoTransacao, novoSaldo) => {
    setSaldoAtual(number);
    setSaldoFuturo(novoSaldo);
    setShowModal(true);
  };

  const saque = () => {
    const valorComMulta = Number(valor) * 1.025;  // Multa de 2,5%
    const novoSaldo = Number(number) - valorComMulta;
    mostrarModal('Saque', novoSaldo);

    if (novoSaldo >= 0) {
      setNumber(novoSaldo);
      setMensagem("Saque realizado com sucesso!");
    } else {
      setMensagem("Saldo insuficiente para realizar o saque.");
    }
  };

  const deposito = () => {
    const valorComMulta = Number(valor) * 1.01; // Bonus de 1%
    const novoSaldo = Number(number) + valorComMulta;
    mostrarModal('Depósito', novoSaldo);
    setNumber(novoSaldo);
    setMensagem("Depósito realizado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./img/bradesco.png')}
      />
      <Text style={styles.saldo}>Saldo: R${number.toFixed(2)}</Text>
      <View style={styles.alinha}>
       
        <TextInput
          id='value'
          value={valor}
          keyboardType='numeric'
          style={styles.input}
          placeholder='Digite o Valor'
          onChangeText={setValor}
        />
      </View>
      <View style={styles.options}>
        <Pressable onPress={saque}><Text style={styles.botao}>Sacar</Text></Pressable>
        <Pressable onPress={deposito}><Text style={styles.botao}>Depositar</Text></Pressable>
      </View>
      <Text style={styles.mensagem}>{mensagem}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowModal(!showModal);
        }}
      >
        <View style={styles.modalView}> 
          <Text style={styles.modalText}>Confirmar Transação</Text>
          <Text>Saldo Atual: R${saldoAtual.toFixed(2)}</Text>
          <Text>Saldo após a transação: R${saldoFuturo.toFixed(2)}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={confirmarTransacao}
          >
            <Text style={styles.textStyle}>Confirmar</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={cancelarTransacao}
          >
            <Text style={styles.textStyle}>Cancelar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}; 

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    logo: {
        width: 300,
        height: 100,
        marginBottom: 20
    },
    saldo: {
        margin: 30,
    },

    alinha: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 20,
    },

    input: {
        width: 200,
        marginLeft: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    options: {
        display: 'flex',
        justifyContent: 'space-around'
    },

    dinheiro: {
        width: 40,
        height: 40
    },

    botao: {
        backgroundColor: '#b81414',
        textAlign: 'center',
        padding: 5,
        color: '#FFF', 
        width: 150,
        margin: 10,
        borderRadius: 15,
    },
    modalView: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        transform: ['translate(-50%, -50%)'],
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        zIndex: 999,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
      },
});

export default App;