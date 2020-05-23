function Student (nameOfStudent, emailOfStudent) {
  let homeworkResults = [];
  const email = emailOfStudent;
  const name = nameOfStudent;
  
  this.getName = function() { 
    return name; 
  }
  this.getEmail = function() { 
    return email; 
  }

  this.addHomeworkResult = function(topic, success) {
    homeworkResults.push({topic: `${topic}`, success: success});
  }
  this.getHomeworkResults = function() {
    return homeworkResults;
  }
}

function FrontendLab(students, failedLimit) {
  const failedHomeworksLimit = failedLimit;
  let studentsList = [];
  students.forEach(student => {
      const newStudent = new Student(student.name, student.email);
      studentsList.push(newStudent);
  });

  this.printStudentsList = function() {
    studentsList.forEach( student => {
      console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
      console.log(student.getHomeworkResults());
    });
  }

  this.addHomeworkResults = function(obj) {
    studentsList.forEach( student => {
      for (let i=0; i < obj.results.length; i++) {
        if (obj.results[i].email === student.getEmail()) {
          student.addHomeworkResult(`${obj.topic}`, obj.results[i].success);
        }
      }
    })
  }

  this.printStudentsEligibleForTest = function() {
    studentsList.forEach( student => {
      let counter = 0;
      for (let i=0; i < student.getHomeworkResults().length; i++) {
        if (student.getHomeworkResults()[i].success === false) {
          counter++;
        }
      }
      if ( counter <= failedHomeworksLimit) {
        console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
      }
    })
  }
}