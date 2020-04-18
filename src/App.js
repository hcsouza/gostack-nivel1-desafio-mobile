
import React, { useEffect, useState } from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    const response =  api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    const index = repositories.findIndex( searchedRepository => 
      searchedRepository.id === id
    ) 
    const updated =  repositories.map(repository => (
       (repository.id === id) ? response.data : repository  
    ));
    setRepositories(updated);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.repositoryContainer}
          data={repositories}
          keyExtractor={ repository => repository.id}
          renderItem={( {  item: repository }) => (
            <>
              <View>
                <Text style={styles.repository}>{repository.title}</Text>
                <View style={styles.techsContainer}>
                    {repository.techs.map( tech => (
                      <Text style={styles.tech} key={tech}>
                        {tech}
                      </Text>
                    ))}
                </View>
                <View key={`container-like-${repository.id}`} style={styles.likesContainer}>
                    <Text
                      style={styles.likeText}
                      key={`repository-likes-key-${repository.id}`}
                      testID={`repository-likes-${repository.id}`}
                    >
                      {repository.likes } { (repository.likes > 1) ? "curtidas" : "curtida" } 
                    </Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  key={`button-${repository.id}`}
                  testID={`like-button-${repository.id}`}
                >
                  <Text key={`button-text-like-${repository.id}`}  style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
                <View style={styles.lineRuler} />
            </View>
            </>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 35,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 22,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
  lineRuler: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 15
  }
});
