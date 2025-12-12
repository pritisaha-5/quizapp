package com.example;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.router.RouterLink;

public class MainView extends AppLayout {

    public MainView() {
        H1 title = new H1("Quiz App");
        title.getStyle().set("margin", "10px");

        RouterLink home = new RouterLink("Home", HomeView.class);

        addToNavbar(title, home);
    }
}
