var panel = $("quiz");
var countStartNumber = 30;

var questions = [{
    question: "What Imperial Star Destroyer intercepted Pricess Leia's ship above Tatooine in A New Hope",
    answers: ["The Devastator", "The Conqueror", "Millienium Falcon", "Death Star"],
    correctAnswer: "The Devastator",
    image: "./assets/images/annie.gif"
  }, {
    question: "What is the weapon used by jedis?",
    answers: ["Glock", "Light Sword", "Sword", "Lightsaber"],
    correctAnswer: "Lightsaber",
    image: "./assets/images/bad.gif"
  }, {
    question: "Who is luke and leia's mother",
    answers: ["George Lucas", "Padme Amidala", "Darth Maul", "Chewie"],
    correctAnswer: "Padme Amidala",
    image: "./assets/images/darthMaul.gif"
  }, {
    question: "How many members are there in the Jedi Council?",
    answers: ["4", "23", "32", "12"],
    correctAnswer: "12",
    image: "./assets/images/han.gif"
  }, {
    question: "In the Star Wars film, what invisible power binds the galaxy together?",
    answers: ["The Force", "The rings of power", "Magic", "Phillery"],
    correctAnswer: "The Force",
    image: "./assets/images/kylo.gif"
  }, {
    question: "What animals did the visual effects crew study when designing the Imperial Walkers from The Empire Strikes Back?",
    answers: ["Leopard", "Dogs", "Lions", "Elephants"],
    correctAnswer: "Elephants",
    image: "./assets/images/luke.gif"
  }, {
    question: "What U.S. magazine declared Star Wars “the year’s best movie” in its May 30, 1977, issue?",
    answers: ["Time", "New York Times", "Cosmo", "Si Swimsuit"],
    correctAnswer: "Time",
    image: "./assets/images/mustafar.gif"
  }, {
    question: "According to Star Wars legend, what substance powers lightsabers?",
    answers: ["Kryptonite", "Diamond", "Ilum crystals", "Ruby"],
    correctAnswer: "Ilum crystals",
    image: "./assets/images/yoda.gif"
  }];

  var timer;

  var game = {
  
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
  
    countdown: function() {
      game.counter--;
      $("#counter-number").text(game.counter);
      if (game.counter === 0) {
        console.log("TIME UP");
        game.timeUp();
      }
    },
  
    loadQuestion: function() {
  
      timer = setInterval(game.countdown, 1000);
  
      panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
  
      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
        panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
        + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
      }
    },
  
    nextQuestion: function() {
      game.counter = countStartNumber;
      $("#counter-number").text(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
  
    timeUp: function() {
  
      clearInterval(timer);
  
      $("#counter-number").html(game.counter);
  
      panel.html("<h2>Out of Time!</h2>");
      panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
      panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
  
      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      }
      else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
  
    results: function() {
  
      clearInterval(timer);
  
      panel.html("<h2>All done, heres how you did!</h2>");
  
      $("#counter-number").text(game.counter);
  
      panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
      panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
      panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
      panel.append("<br><button id='start-over'>Start Over?</button>");
    },
  
    clicked: function(e) {
      clearInterval(timer);
      if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
        this.answeredCorrectly();
      }
      else {
        this.answeredIncorrectly();
      }
    },
  
    answeredIncorrectly: function() {
  
      game.incorrect++;
  
      clearInterval(timer);
  
      panel.html("<h2>Nope!</h2>");
      panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
      panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
  
      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      }
      else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
  
    answeredCorrectly: function() {
  
      clearInterval(timer);
  
      game.correct++;
  
      panel.html("<h2>Correct!</h2>");
      panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
  
      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      }
      else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
  
    reset: function() {
      this.currentQuestion = 0;
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };
  
  // CLICK EVENTS
  
  $(document).on("click", "#start-over", function() {
    game.reset();
  });
  
  $(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
  });
  
  $(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion();
  });
  