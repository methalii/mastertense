document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.tab-content');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    // Tab Switching
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Show target section
            const targetId = link.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('mobile-active');
            }

            // Scroll to top
            window.scrollTo(0, 0);
        });
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-active');
    });


    // --- Quiz Engine ---

    const questions = [
        // Present Simple
        {
            text: "Water _____ at 100 degrees Celsius.",
            options: ["boil", "boils", "is boiling", "boiled"],
            correct: 1,
            explanation: "Correct! We use Present Simple for scientific facts."
        },
        {
            text: "She _____ coffee.",
            options: ["doesn't like", "don't like", "not like", "isn't liking"],
            correct: 0,
            explanation: "Correct! For 'She' (3rd person singular), we use 'doesn't' + base verb."
        },
        {
            text: "_____ you play tennis on Sundays?",
            options: ["Does", "Do", "Are", "Have"],
            correct: 1,
            explanation: "Correct! We use 'Do' for 'You' in Present Simple questions."
        },
        {
            text: "He usually _____ to work by bus.",
            options: ["go", "goes", "is going", "gone"],
            correct: 1,
            explanation: "Correct! 'Usually' is a keyword for Present Simple. He + goes."
        },
        {
            text: "The sun _____ in the east.",
            options: ["rise", "rising", "rises", "rose"],
            correct: 2,
            explanation: "Correct! General truth/fact uses Present Simple."
        },

        // Present Continuous
        {
            text: "Listen! The baby _____.",
            options: ["cries", "cry", "is crying", "crying"],
            correct: 2,
            explanation: "Correct! 'Listen!' indicates an action happening right now."
        },
        {
            text: "I _____ my friend tonight.",
            options: ["meet", "am meeting", "meets", "meeting"],
            correct: 1,
            explanation: "Correct! We use Present Continuous for fixed future arrangements."
        },
        {
            text: "Look! It _____.",
            options: ["snows", "is snowing", "snowed", "snowing"],
            correct: 1,
            explanation: "Correct! 'Look!' indicates something happening at this moment."
        },
        {
            text: "I _____ (not) to the party now.",
            options: ["don't go", "not going", "am not going", "doesn't go"],
            correct: 2,
            explanation: "Correct! Negative form of Present Continuous: am not + ing."
        },

        // Past Simple
        {
            text: "I _____ a movie yesterday.",
            options: ["see", "saw", "seen", "was seeing"],
            correct: 1,
            explanation: "Correct! 'Yesterday' requires Past Simple (V2). Saw is the past of See."
        },
        {
            text: "She _____ come to the party last night.",
            options: ["didn't", "doesn't", "wasn't", "not"],
            correct: 0,
            explanation: "Correct! We use 'didn't' for Past Simple negatives."
        },
        {
            text: "_____ you buy the bread?",
            options: ["Do", "Were", "Did", "Have"],
            correct: 2,
            explanation: "Correct! We use 'Did' for Past Simple questions."
        },
        {
            text: "We _____ in London in 2010.",
            options: ["live", "lived", "living", "have lived"],
            correct: 1,
            explanation: "Correct! 'In 2010' is a specific past time."
        },

        // Past Continuous
        {
            text: "I _____ when you called.",
            options: ["slept", "was sleeping", "am sleeping", "have slept"],
            correct: 1,
            explanation: "Correct! An action in progress (sleeping) interrupted by another (called)."
        },
        {
            text: "What _____ you doing at 5 PM?",
            options: ["did", "was", "were", "are"],
            correct: 2,
            explanation: "Correct! 'You' takes 'were' in Past Continuous."
        },
        {
            text: "While I was studying, my brother _____ games.",
            options: ["played", "was playing", "plays", "is playing"],
            correct: 1,
            explanation: "Correct! Two parallel actions in the past often use Past Continuous."
        },
        {
            text: "It _____ heavily when we left.",
            options: ["rained", "was raining", "is raining", "rains"],
            correct: 1,
            explanation: "Correct! Background action in the past."
        },

        // Present Perfect
        {
            text: "I _____ my keys. I can't find them.",
            options: ["lost", "have lost", "lose", "am losing"],
            correct: 1,
            explanation: "Correct! Action in the past with a result now (keys are gone)."
        },
        {
            text: "She _____ finished her homework yet.",
            options: ["didn't", "hasn't", "haven't", "isn't"],
            correct: 1,
            explanation: "Correct! 'Yet' is a keyword for Present Perfect negative."
        },
        {
            text: "Have you ever _____ to Paris?",
            options: ["go", "went", "been", "going"],
            correct: 2,
            explanation: "Correct! 'Been' is the past participle used for visits."
        },
        {
            text: "We have lived here _____ ten years.",
            options: ["since", "for", "ago", "during"],
            correct: 1,
            explanation: "Correct! We use 'for' with a duration of time."
        },

        // Future (Going To)
        {
            text: "Look at those clouds! It _____ rain.",
            options: ["will", "is going to", "goes to", "shall"],
            correct: 1,
            explanation: "Correct! Prediction based on present evidence (clouds)."
        },
        {
            text: "I _____ study medicine next year.",
            options: ["will", "am going to", "go to", "am going"],
            correct: 1,
            explanation: "Correct! A plan or intention for the future."
        },
        {
            text: "She _____ visit her grandma tomorrow.",
            options: ["is going to", "will", "goes", "going to"],
            correct: 0,
            explanation: "Correct! A planned future action."
        },
        {
            text: "They _____ (not) going to come.",
            options: ["don't", "won't", "aren't", "not"],
            correct: 2,
            explanation: "Correct! Negative of 'be going to' uses 'aren't' for 'they'."
        },

        // Future (Will)
        {
            text: "I think it _____ snow tomorrow.",
            options: ["is going to", "will", "shalls", "willing"],
            correct: 1,
            explanation: "Correct! Prediction without evidence (I think)."
        },
        {
            text: "Don't worry, I _____ help you.",
            options: ["am going to", "will", "am helping", "help"],
            correct: 1,
            explanation: "Correct! An offer or promise made at the moment."
        },
        {
            text: "I promise I _____ tell anyone.",
            options: ["don't", "won't", "not", "am not"],
            correct: 1,
            explanation: "Correct! A promise uses 'will' (or 'won't' for negative)."
        },
        {
            text: "Wait, I _____ open the door.",
            options: ["will", "am going to", "open", "opening"],
            correct: 0,
            explanation: "Correct! Instant decision."
        },
        {
            text: "He will _____ to the party.",
            options: ["go", "goes", "going", "to go"],
            correct: 0,
            explanation: "Correct! After 'will', use the base verb (V1) without 'to' or '-s'."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let shuffledQuestions = [];

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackArea = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const scoreDisplay = document.getElementById('score');
    const totalDisplay = document.getElementById('total-questions');

    function initQuiz() {
        // Shuffle questions
        shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        score = 0;
        scoreDisplay.textContent = score;
        totalDisplay.textContent = shuffledQuestions.length;
        loadQuestion();
    }

    function loadQuestion() {
        const currentQ = shuffledQuestions[currentQuestionIndex];
        questionText.textContent = `${currentQuestionIndex + 1}. ${currentQ.text}`;
        optionsContainer.innerHTML = '';
        feedbackArea.className = 'feedback-area';
        feedbackArea.textContent = '';
        nextBtn.classList.add('hidden');

        currentQ.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => checkAnswer(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(selectedIndex, selectedBtn) {
        // Disable all buttons
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);

        const currentQ = shuffledQuestions[currentQuestionIndex];
        const isCorrect = selectedIndex === currentQ.correct;

        if (isCorrect) {
            selectedBtn.classList.add('correct');
            feedbackArea.classList.add('show', 'correct');
            feedbackArea.textContent = currentQ.explanation;
            score++;
            scoreDisplay.textContent = score;
        } else {
            selectedBtn.classList.add('wrong');
            // Highlight correct answer
            buttons[currentQ.correct].classList.add('correct');
            feedbackArea.classList.add('show', 'wrong');
            feedbackArea.textContent = `Wrong. ${currentQ.explanation}`;
        }

        nextBtn.classList.remove('hidden');
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            loadQuestion();
        } else {
            showFinalResult();
        }
    });

    function showFinalResult() {
        questionText.textContent = "Quiz Completed!";
        optionsContainer.innerHTML = '';
        feedbackArea.className = 'feedback-area show correct';
        feedbackArea.textContent = `You scored ${score} out of ${shuffledQuestions.length}!`;
        nextBtn.textContent = "Restart Quiz";
        nextBtn.removeEventListener('click', showFinalResult); // Remove old listener if any (though logic handles it)

        // Clone button to remove listeners or just reset logic
        const newBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newBtn, nextBtn);

        newBtn.addEventListener('click', () => {
            newBtn.textContent = "Next Question";
            initQuiz();
        });
    }

    // Start Quiz
    initQuiz();

});
