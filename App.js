import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Button, List, Portal, Modal, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
export default function App() {
  // HOOK
  const [cep , setCep] = useState(''); 
  let [dados, setDados] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const [selectedSexValue, setSelectedSexValue] = useState(null);
  //criar uma função para mudar o estado
  const handleAccordionPress = () => setExpanded(!expanded);
  //pegar o valor do selection e mostrar na tela
  const handleItemPress = (x)=>{
    setSelectedValue(x);
    setExpanded(false);
  }

  const handleSexPress = (x) =>{
    setSelectedSexValue(x);
    setExpanded(false);
  }

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const BuscaCep=(xcep)=>{
    let url = `https://viacep.com.br/ws/${xcep}/json/`
    //console.log(url)
    fetch(url)
    .then(
      (re)=>{ return re.json() }
    ).then(
      (dados)=>{
        console.log(dados);
        setDados(dados);
        setSelectedValue(dados.uf);
      }
    ).catch(
      (showModal)
    );
  }

  return (
    <PaperProvider>
    <ScrollView>
      <View style={styles.container}>

        <TextInput
          style={styles.field} 
          label='nome'
          mode='outlined'
          placeholder='Nome'
        />

        <TextInput
          style={styles.field} 
          label='email'
          mode='outlined'
          placeholder='Email'
        />

        <List.Section>
          <List.Accordion title={ selectedSexValue == null ? 'Sexo': selectedSexValue }
            expanded={expanded}
            onPress={handleAccordionPress}>
            
            <List.Item title="Masculino" onPress={()=>{handleSexPress("Masculino")}} />
            <List.Item title="Feminino" onPress={()=>{handleSexPress("Feminino")}} />
            </List.Accordion>

        </List.Section>

        <TextInput 
          style={styles.field}
          placeholder='digite o cep'
          onChangeText={ (x)=>{ setCep(x) }}
          onBlur={() => {BuscaCep(cep)}}
        />

        <TextInput
          style={styles.field}
          label='Rua'
          mode='outlined'
          placeholder='Rua'
          value={dados.logradouro}
          onChangeText={(value) => {setDados(dados.localidade = value)}}
        />

        <TextInput
          style={styles.field}
          label='numero'
          mode='outlined'
          placeholder='Número'
        />

        <TextInput
          style={styles.field} 
          label='complemento'
          mode='outlined'
          placeholder='Complemento'
        />

        <TextInput
          style={styles.field} 
          label='Bairro'
          mode='outlined'
          placeholder='Bairro'
          value={dados.bairro}
          onChangeText={(value) => {setDados(dados.bairro = value)}}
        />  

        <TextInput
          style={styles.field} 
          label='localidade'
          mode='outlined'
          placeholder='Cidade'
          value={dados.localidade}
          onChangeText={(value) => {setDados(dados.localidade = value)}}
        />

        <List.Section title="Estado">
          <List.Accordion title={ selectedValue == null ? 'Selecione o estado': selectedValue } 
            expanded={expanded}
            onPress={handleAccordionPress}>
            <List.Item title="AC" onPress={()=>{handleItemPress("AC")}} />
            <List.Item title="AL" onPress={()=>{handleItemPress("AL")}} />
            <List.Item title="AP" onPress={()=>{handleItemPress("AP")}} />
            <List.Item title="AM" onPress={()=>{handleItemPress("AM")}} />
            <List.Item title="BA" onPress={()=>{handleItemPress("BA")}} />
            <List.Item title="CE" onPress={()=>{handleItemPress("CE")}} />
            <List.Item title="DF" onPress={()=>{handleItemPress("DF")}} />
            <List.Item title="ES" onPress={()=>{handleItemPress("ES")}} />
            <List.Item title="GO" onPress={()=>{handleItemPress("GO")}} />
            <List.Item title="MA" onPress={()=>{handleItemPress("MA")}} />
            <List.Item title="MT" onPress={()=>{handleItemPress("MT")}} />
            <List.Item title="MS" onPress={()=>{handleItemPress("MS")}} />
            <List.Item title="MG" onPress={()=>{handleItemPress("MG")}} />
            <List.Item title="PA" onPress={()=>{handleItemPress("PA")}} />
            <List.Item title="PB" onPress={()=>{handleItemPress("PB")}} />
            <List.Item title="PR" onPress={()=>{handleItemPress("PR")}} />
            <List.Item title="PE" onPress={()=>{handleItemPress("PE")}} />
            <List.Item title="PI" onPress={()=>{handleItemPress("PI")}} />
            <List.Item title="RJ" onPress={()=>{handleItemPress("RJ")}} />
            <List.Item title="RN" onPress={()=>{handleItemPress("RN")}} />
            <List.Item title="RS" onPress={()=>{handleItemPress("RS")}} />
            <List.Item title="RO" onPress={()=>{handleItemPress("RO")}} />
            <List.Item title="RR" onPress={()=>{handleItemPress("RR")}} />
            <List.Item title="SC" onPress={()=>{handleItemPress("SC")}} />
            <List.Item title="SP" onPress={()=>{handleItemPress("SP")}} />
            <List.Item title="SE" onPress={()=>{handleItemPress("SE")}} />
            <List.Item title="TO" onPress={()=>{handleItemPress("TO")}} />

          </List.Accordion>
        </List.Section>

          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
              <Text>CEP não existe ou não foi encontrado,
                    digie um cep válido</Text>
              <Button style={styles.button} onPress={hideModal}>Fechar</Button>
            </Modal>
          </Portal>
        
        <Button
          mode='outlined'
        >
          Cadastrar
        </Button>
      </View>
    </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    justifyContent: 'center',
  },
  field: {
    alignContent:'center',
    borderColor:'black',
    borderWidth: 1,
    borderStyle:'Solid',
    borderRadius: 4,
    marginBottom: 5,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  }
});
