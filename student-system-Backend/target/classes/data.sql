-- Cursuri
INSERT INTO course (cid, name, days, start_time, end_time, instructor) VALUES
('17651', 'Tehnologii workflow', 'LU', 1620, 1750, 'Cicortas'),
('17652', 'Modele si metode formale in ingineria software', 'MA', 1800, 1930, 'Dragan'),
('17653', 'Procese si management in ingineria software', 'MI', 1800, 1930, 'Sandru'),
('17654', 'Metode distribuite si tehnologii bazate pe XML', 'MI', 1800, 1930, 'Fortis'),
('17655', 'Arhitecturi pentru sisteme software', 'JO', 1800, 1930, 'Mindruta'),
('17656', 'Sisteme distribuite', 'VI', 1800, 1930, 'Petcu');

-- Studenți
INSERT INTO student (sid, name, specialization) VALUES
('123456789', 'Stan Adrian', 'IS'),
('012345678', 'Pop Adina', 'IS'),
('145643133', 'Serban Adela', 'IS'),
('901234567', 'Ionescu Iulian', 'IS'),
('890123456', 'Stoica Andrei', 'IS'),
('812998191', 'Albu Felicia', 'IS'),
('121231422', 'Popa Irina', 'IS'),
('789012345', 'Cristea Carmen', 'IS');

-- Cursuri absolvite
INSERT INTO student_completed_courses (student_sid, course_id) VALUES
('123456789', '05610'),
('123456789', '17651'),
('123456789', '17653'),
('012345678', '46921'),
('012345678', '05610'),
('012345678', '17652'),
('012345678', '17651'),
('012345678', '17653'),
('012345678', '17654');
