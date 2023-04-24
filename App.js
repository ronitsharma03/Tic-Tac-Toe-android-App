import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, RefreshControl, ImageBackground } from 'react-native';


export default function App() {
  const [refresh, setRefresh] = useState(false);
  const [board, setBoard] = useState([
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " "
  ]
  );
  const [notification, setnotification] = useState("Player X to start");
  const [currentPlayer, setCurrentPlayer] = useState("X");


  const pressfields = (index => {
    const newBoard = board;
    if (newBoard[index] !== "X" && newBoard[index] !== "O") {
      if (currentPlayer == "X") {
        newBoard[index] = "X";
        setCurrentPlayer("O");
        setnotification("Player O to move");
      } else {
        newBoard[index] = "O";
        setCurrentPlayer("X");
        setnotification("Player X to move");
      }
      setBoard(newBoard);
      setRefresh(!refresh);
      checkIfPlayerWon();
    }
  }
  )

  const checkIfPlayerWon = () => {
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== " ") {
      PlayerWon(board[0]);
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== " ") {
      PlayerWon(board[3]);
    } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== " ") {
      PlayerWon(board[6]);
    } else if (board[0] === board[4] && board[4] === board[8] && board[8] !== " ") {
      PlayerWon(board[0]);
    } else if (board[2] === board[4] && board[4] === board[6] && board[6] !== " ") {
      PlayerWon(board[2]);
    } else if (board[0] === board[3] && board[3] === board[6] && board[6] !== " ") {
      PlayerWon(board[0]);
    } else if (board[1] === board[4] && board[4] === board[7] && board[7] !== " ") {
      PlayerWon(board[1]);
    } else if (board[2] === board[5] && board[5] === board[8] && board[8] !== " ") {
      PlayerWon(board[2]);
    } else if (!board.includes(" ")) {
      setnotification("Game Over! It's a draw!");
      setBoard([
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " "
      ]);
      setCurrentPlayer("X");
      setnotification("Player " + currentPlayer + " to start!");
    }
  }
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const PlayerWon = async (symbol) => {
    setnotification("Game Over!");
    alert("Player " + symbol + " Won!");
    await delay(2000);
    setBoard([
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " "
    ]);
    if (symbol == "X") {
      setnotification("Player O to move");
    } else {
      setnotification("Player X to move");
    }
  }



  return (
    <View style={styles.container}>
    <StatusBar style='auto' />
    <Image source={require("./assets/bg4.jpg")} style={styles.backImage}/>
    
      <Text style={styles.text}>TicTacToe Game</Text>
      <Text style={styles.text1}>{notification}</Text>
      <View style={styles.flatlistcontainer}>
      <Image source={require('./assets/bg.png')} style={styles.image} />
        <FlatList
          style={styles.list}
          data={board}
          numColumns={3}
          refreshing={true}
          extraData={refresh}
          renderItem={({ item, index }) =>
            <TouchableOpacity style={styles.square} onPress={() => pressfields(index)}>
              <Text style={styles.text2}>{item}</Text>
            </TouchableOpacity>
          }
        />
      </View>
      <Text style={styles.copyright}>Copyright &copy; by Ronit{new Date().getFullYear()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backImage:{
    position: 'absolute',
    width: 430,
    height: 1000,
  },
  container: {
    alignItems:'center',
  },
  text: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 500,
    marginTop: 100,
    marginBottom: 80,
  },
  text1: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 50,
  },
  text2: {
    fontSize: 60,
    fontWeight: 500,
    color: '#fff',
  },
  list: {
    width: 300,
    height: 300,
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
    position: 'absolute',
    right: -12,
    borderRadius: 20,
  },
  copyright: {
    color: "#fff",
    position: 'absolute',
    top: 800,
  }
});
