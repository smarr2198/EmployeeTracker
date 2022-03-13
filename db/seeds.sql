INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stephen", "Marr", 1, 1),
       ("Chris", "Marr", 2, 1),
       ("David", "Blaine", 3, 1);

INSERT INTO position_roll (title, salary, department_id)
VALUES ("Manager", 100000.00, 1),
       ("Sales", 75000.00, 2),
       ("Intern", 25000.00, 3);

INSERT INTO department (department_name)
VALUES ("Management"),
       ("Sales Team"),
       ("Interns");
       
