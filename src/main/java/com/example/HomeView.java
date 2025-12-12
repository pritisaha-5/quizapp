package com.example;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route(value = "", layout = MainView.class)
@PageTitle("Quiz App")
public class HomeView extends VerticalLayout {

    private final List<Question> questions;
    private int currentIndex = 0;
    private int score = 0;

    private H2 questionText = new H2();
    private RadioButtonGroup<String> options = new RadioButtonGroup<>();
    private Button nextButton = new Button("Next");

    public HomeView() {
        questions = new QuestionService().getQuestions();

        setSpacing(true);
        setPadding(true);
        setWidth("400px");

        add(questionText, options, nextButton);

        loadQuestion();

        nextButton.addClickListener(e -> handleNext());
    }

    private void loadQuestion() {
        if (currentIndex >= questions.size()) {
            showResult();
            return;
        }

        Question q = questions.get(currentIndex);
        questionText.setText(q.getQuestion());
        options.setItems(q.getOptions());
    }

    private void handleNext() {
        Question q = questions.get(currentIndex);

        int selected = q.getOptions().indexOf(options.getValue());

        if (selected == -1) {
            Notification.show("Please select an option");
            return;
        }

        if (selected == q.getCorrectIndex()) {
            score++;
        }

        currentIndex++;
        loadQuestion();
    }

    private void showResult() {
        removeAll();
        add(new H2("Quiz Completed!"));
        add(new Paragraph("Your Score: " + score + " / " + questions.size()));
    }
}
