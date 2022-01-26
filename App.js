import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  FlatList,
  View,
  Image,
} from "react-native";

const baseUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";

const fetchMeals = async (keyword) => {
  try {
    const params = `?i=${keyword ?? ""}`;
    console.log("baseUrl + params", baseUrl + params);
    const response = await fetch(baseUrl + params);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function App() {
  const [keyword, setKeyword] = React.useState("");
  const [meals, setMeals] = React.useState([]);

  const getMeals = React.useCallback(async () => {
    const meals = await fetchMeals(keyword);
    console.log("meals.meals", meals.meals);
    setMeals(meals.meals);
  }, [fetchMeals, keyword, meals]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setKeyword}
        value={keyword}
      />
      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => getMeals()}
          title="Search"
          accessibilityLabel="Search"
        >
          <Text style={styles.text}>Search</Text>
        </Pressable>
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        {!!meals && (
          <FlatList
            data={meals}
            keyExtractor={(meal) => meal.idMeal}
            renderItem={({ item }) => (
              <View
                style={{
                  display: "flex",
                  marginBottom: 16,
                }}
              >
                <Text style={{ fontSize: 16 }}>{item.strMeal}</Text>
                <Image
                  style={{ width: 100, height: 100 }}
                  resizeMode={"cover"}
                  source={{
                    uri: item.strMealThumb,
                  }}
                />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  buttons: {
    marginBottom: 24,
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2222cc",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
