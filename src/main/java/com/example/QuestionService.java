package com.example;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class QuestionService {

    public List<Question> getQuestions() {
        List<Question> list = new ArrayList<>();

        list.add(new Question(
                "What is the capital of India?",
                Arrays.asList("Delhi", "Mumbai", "Kolkata", "Chennai"),
                0
        ));

        list.add(new Question(
                "Who developed Java?",
                Arrays.asList("James Gosling", "Bjarne Stroustrup", "Guido van Rossum", "Dennis Ritchie"),
                0
        ));

        list.add(new Question(
                "What is 5 + 3?",
                Arrays.asList("5", "7", "8", "10"),
                2
        ));

        return list;
    }
}
