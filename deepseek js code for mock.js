document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const totalQuestions = 30;
    let currentQuestion = 1;
    const timers = {};
    
    // Initialize all timers
    for (let i = 1; i <= totalQuestions; i++) {
        timers[i] = {
            seconds: 0,
            interval: null,
            isPaused: true,
            display: document.createElement('span')
        };
    }
    
    // Track question states
    const questionStates = {};
    for (let i = 1; i <= totalQuestions; i++) {
        questionStates[i] = {
            answered: false,
            markedForReview: false,
            selectedOption: null,
            timeSpent: 0
        };
    }
    
    // Start with first question
    showQuestion(currentQuestion);
    
    // Option selection functionality
    document.addEventListener('click', function(e) {
        // Check if clicked element is a label or inside a label
        let label = e.target.closest('.lb');
        if (label) {
            const questionNum = parseInt(label.classList[1].replace('qs', '').replace('lb', ''));
            
            // Remove selection from all options in this question
            document.querySelectorAll(`.qs${questionNum}-ops .lb`).forEach(opt => {
                opt.style.backgroundColor = '';
                opt.style.border = '';
                opt.querySelector('input[type="radio"]').checked = false;
            });
            
            // Apply selection to clicked option
            label.style.backgroundColor = 'lightgreen';
            label.style.border = '2px solid black';
            label.querySelector('input[type="radio"]').checked = true;
            
            // Update question state
            questionStates[questionNum].answered = true;
            questionStates[questionNum].selectedOption = label.classList[1];
        }
    });
    
    // Next button functionality
    document.querySelector('.nxt-ques-btns button').addEventListener('click', function() {
        const questionNum = currentQuestion;
        const hasAnswer = questionStates[questionNum].answered;
        
        if (hasAnswer) {
            // Update question button appearance
            const questionBtn = document.querySelector(`.ryt-ques-no${questionNum}`);
            questionBtn.style.backgroundColor = 'green';
            questionBtn.innerHTML = `${questionNum}`;
            
            // Update state
            questionStates[questionNum].markedForReview = false;
        } else {
            // Update question button appearance
            const questionBtn = document.querySelector(`.ryt-ques-no${questionNum}`);
            questionBtn.style.backgroundColor = 'red';
            questionBtn.innerHTML = `${questionNum}`;
        }
        
        // Update counts
        updateCounts();
        
        // Show next question
        showQuestion(questionNum + 1);
    });
    
    // Previous button functionality
    document.querySelector('.prev-ques-btns').addEventListener('click', function() {
        const questionNum = currentQuestion;
        const hasAnswer = questionStates[questionNum].answered;
        
        if (hasAnswer) {
            // Update question button appearance
            const questionBtn = document.querySelector(`.ryt-ques-no${questionNum}`);
            questionBtn.style.backgroundColor = 'green';
            questionBtn.innerHTML = `${questionNum}`;
        } else {
            // Update question button appearance
            const questionBtn = document.querySelector(`.ryt-ques-no${questionNum}`);
            questionBtn.style.backgroundColor = 'red';
            questionBtn.innerHTML = `${questionNum}`;
        }
        
        // Update counts
        updateCounts();
        
        // Show previous question
        showQuestion(questionNum - 1);
    });
    
    // Mark for review button functionality
    document.querySelector('.mk-for-rev').addEventListener('click', function() {
        const questionNum = currentQuestion;
        const hasAnswer = questionStates[questionNum].answered;
        
        // Update question state
        questionStates[questionNum].markedForReview = true;
        
        // Update question button appearance
        const questionBtn = document.querySelector(`.ryt-ques-no${questionNum}`);
        questionBtn.style.backgroundColor = 'purple';
        
        if (hasAnswer) {
            questionBtn.innerHTML = `${questionNum}<div class="green-dot"></div>`;
        } else {
            questionBtn.innerHTML = `${questionNum}`;
        }
        
        // Update counts
        updateCounts();
        
        // Show next question
        showQuestion(questionNum + 1);
    });
    
    // Clear response button functionality
    document.querySelector('.clr-rev').addEventListener('click', function() {
        const questionNum = currentQuestion;
        
        // Clear all selections for this question
        document.querySelectorAll(`.qs${questionNum}-ops .lb`).forEach(opt => {
            opt.style.backgroundColor = '';
            opt.style.border = '';
            opt.querySelector('input[type="radio"]').checked = false;
        });
        
        // Update question state
        questionStates[questionNum].answered = false;
        questionStates[questionNum].selectedOption = null;
        
        // Update question button appearance if not marked for review
        if (!questionStates[questionNum].markedForReview) {
            const questionBtn = document.querySelector(`.ryt-ques-no${questionNum}`);
            questionBtn.style.backgroundColor = '';
            questionBtn.innerHTML = `${questionNum}`;
        }
        
        // Update counts
        updateCounts();
    });
    
    // Question navigation buttons
    for (let i = 1; i <= totalQuestions; i++) {
        document.querySelector(`.ryt-ques-no${i}`).addEventListener('click', function() {
            // Update current question state before navigating
            const questionNum = currentQuestion;
            const hasAnswer = questionStates[questionNum].answered;
            
            if (hasAnswer) {
                const questionBtn = document.querySelector(`.ryt-ques-no${questionNum}`);
                if (questionStates[questionNum].markedForReview) {
                    questionBtn.style.backgroundColor = 'purple';
                    questionBtn.innerHTML = `${questionNum}<div class="green-dot"></div>`;
                } else {
                    questionBtn.style.backgroundColor = 'green';
                    questionBtn.innerHTML = `${questionNum}`;
                }
            } else {
                const questionBtn = document.querySelector(`.ryt-ques-no${questionNum}`);
                if (questionStates[questionNum].markedForReview) {
                    questionBtn.style.backgroundColor = 'purple';
                    questionBtn.innerHTML = `${questionNum}`;
                } else {
                    questionBtn.style.backgroundColor = 'red';
                    questionBtn.innerHTML = `${questionNum}`;
                }
            }
            
            // Update counts
            updateCounts();
            
            // Navigate to selected question
            showQuestion(i);
        });
    }
    
    // Submit button functionality
    document.querySelector('.submit-btn').addEventListener('click', function() {
        if (confirm('Are you sure you want to submit the test?')) {
            // Calculate final time spent on each question
            for (let i = 1; i <= totalQuestions; i++) {
                if (timers[i].interval) {
                    clearInterval(timers[i].interval);
                }
                questionStates[i].timeSpent = timers[i].seconds;
            }
            
            // Here you would typically send the data to the server
            console.log('Test submitted!', questionStates);
            alert('Test submitted successfully!');
        }
    });
    
    // Helper function to show a specific question
    function showQuestion(questionNum) {
        if (questionNum < 1 || questionNum > totalQuestions) return;
        
        // Pause timer for current question
        if (currentQuestion !== questionNum) {
            if (timers[currentQuestion].interval) {
                clearInterval(timers[currentQuestion].interval);
                timers[currentQuestion].isPaused = true;
            }
            
            // Hide current question timer
            document.getElementById('timerdisplay').textContent = '00:00';
        }
        
        // Update current question
        currentQuestion = questionNum;
        
        // Here you would typically load the actual question content
        // For this example, we'll just simulate it
        document.querySelector('.ques1').textContent = `QUESTION ${questionNum} MAIN BODY`;
        document.querySelector('.qs1').textContent = `QUESTION ${questionNum} SUB QUESTION 1`;
        
        // Start/resume timer for the new question
        startTimer(questionNum);
        
        // Restore any selected options for this question
        if (questionStates[questionNum].selectedOption) {
            const selectedLabel = document.querySelector(`.${questionStates[questionNum].selectedOption}`);
            if (selectedLabel) {
                selectedLabel.style.backgroundColor = 'lightgreen';
                selectedLabel.style.border = '2px solid black';
                selectedLabel.querySelector('input[type="radio"]').checked = true;
            }
        }
    }
    
    // Helper function to start/resume a timer for a question
    function startTimer(questionNum) {
        if (timers[questionNum].interval) {
            clearInterval(timers[questionNum].interval);
        }
        
        timers[questionNum].isPaused = false;
        timers[questionNum].interval = setInterval(function() {
            timers[questionNum].seconds++;
            updateTimerDisplay(questionNum);
        }, 1000);
        
        // Update timer display immediately
        updateTimerDisplay(questionNum);
    }
    
    // Helper function to update timer display
    function updateTimerDisplay(questionNum) {
        const minutes = Math.floor(timers[questionNum].seconds / 60);
        const seconds = timers[questionNum].seconds % 60;
        document.getElementById('timerdisplay').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Helper function to update all counts
    function updateCounts() {
        const answeredCount = Object.values(questionStates).filter(q => q.answered && !q.markedForReview).length;
        const mfraCount = Object.values(questionStates).filter(q => q.markedForReview && q.answered).length;
        const mfrCount = Object.values(questionStates).filter(q => q.markedForReview && !q.answered).length;
        const notAnsweredCount = Object.values(questionStates).filter(q => !q.answered && !q.markedForReview).length;
        
        document.getElementById('answrd').textContent = answeredCount;
        document.getElementById('m-f-r-a').textContent = mfraCount;
        document.getElementById('m-f-r').textContent = mfrCount;
        document.getElementById('n-a').textContent = notAnsweredCount;
    }
    
    // Add CSS for the green dot and question buttons
    const style = document.createElement('style');
    style.textContent = `
        .green-dot {
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 8px;
            height: 8px;
            background-color: green;
            border-radius: 50%;
        }
        .ryt-ques-no1, .ryt-ques-no2, .ryt-ques-no3, .ryt-ques-no4, .ryt-ques-no5,
        .ryt-ques-no6, .ryt-ques-no7, .ryt-ques-no8, .ryt-ques-no9, .ryt-ques-no10,
        .ryt-ques-no11, .ryt-ques-no12, .ryt-ques-no13, .ryt-ques-no14, .ryt-ques-no15,
        .ryt-ques-no16, .ryt-ques-no17, .ryt-ques-no18, .ryt-ques-no19, .ryt-ques-no20,
        .ryt-ques-no21, .ryt-ques-no22, .ryt-ques-no23, .ryt-ques-no24, .ryt-ques-no25,
        .ryt-ques-no26, .ryt-ques-no27, .ryt-ques-no28, .ryt-ques-no29, .ryt-ques-no30 {
            position: relative;
            display: inline-block;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            margin: 5px;
            border: 1px solid #ccc;
            cursor: pointer;
        }
        .lb {
            display: block;
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #ddd;
            cursor: pointer;
        }
        .lb input[type="radio"] {
            margin-right: 8px;
        }
    `;
    document.head.appendChild(style);
});

























































// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize variables
//     const totalQuestions = 30;
//     let currentQuestion = 1;
//     const timers = {};
    
//     // Initialize all timers
//     for (let i = 1; i <= totalQuestions; i++) {
//         timers[i] = {
//             seconds: 0,
//             interval: null,
//             isPaused: true
//         };
//     }
    
//     // Start timer for first question
//     startTimer(currentQuestion);
    
//     // Track question states
//     const questionStates = {};
//     for (let i = 1; i <= totalQuestions; i++) {
//         questionStates[i] = {
//             answered: false,
//             markedForReview: false,
//             selectedOption: null,
//             timeSpent: 0
//         };
//     }
    
//     // Option selection functionality
//     document.querySelectorAll('.lb').forEach(label => {
//         label.addEventListener('click', function() {
//             const questionNum = parseInt(this.classList[1].replace('qs', '').replace('lb', ''));
            
//             // Remove selection from all options in this question
//             document.querySelectorAll(`.qs${questionNum}lb1, .qs${questionNum}lb2, .qs${questionNum}lb3, .qs${questionNum}lb4, .qs${questionNum}lb5`).forEach(opt => {
//                 opt.style.backgroundColor = '';
//                 opt.style.border = '';
//             });
            
//             // Apply selection to clicked option
//             this.style.backgroundColor = 'lightgreen';
//             this.style.border = '2px solid black';
            
//             // Update question state
//             questionStates[questionNum].answered = true;
//             questionStates[questionNum].selectedOption = this.classList[1];
            
//             // Update radio button selection
//             const radio = this.querySelector('input[type="radio"]');
//             if (radio) radio.checked = true;
//         });
//     });
    
//     // Next button functionality
//     document.querySelector('.nxt-ques-btns button').addEventListener('click', function() {
//         updateQuestionState(currentQuestion);
//         showQuestion(currentQuestion + 1);
//     });
    
//     // Previous button functionality
//     document.querySelector('.prev-ques-btns').addEventListener('click', function() {
//         updateQuestionState(currentQuestion);
//         showQuestion(currentQuestion - 1);
//     });
    
//     // Mark for review button functionality
//     document.querySelector('.mk-for-rev').addEventListener('click', function() {
//         const questionNum = currentQuestion;
//         const hasAnswer = questionStates[questionNum].answered;
        
//         questionStates[questionNum].markedForReview = true;
        
//         if (hasAnswer) {
//             // Marked for review and answered
//             document.querySelector(`.ryt-ques-no${questionNum}`).style.backgroundColor = 'purple';
//             document.querySelector(`.ryt-ques-no${questionNum}`).innerHTML = `${questionNum}<div class="green-dot"></div>`;
            
//             // Update count
//             const mfraCount = Object.values(questionStates).filter(q => q.markedForReview && q.answered).length;
//             document.getElementById('m-f-r-a').textContent = mfraCount;
//         } else {
//             // Only marked for review
//             document.querySelector(`.ryt-ques-no${questionNum}`).style.backgroundColor = 'purple';
            
//             // Update count
//             const mfrCount = Object.values(questionStates).filter(q => q.markedForReview && !q.answered).length;
//             document.getElementById('m-f-r').textContent = mfrCount;
//         }
        
//         showQuestion(questionNum + 1);
//     });
    
//     // Clear response button functionality
//     document.querySelector('.clr-rev').addEventListener('click', function() {
//         const questionNum = currentQuestion;
        
//         // Clear all selections for this question
//         document.querySelectorAll(`.qs${questionNum}lb1, .qs${questionNum}lb2, .qs${questionNum}lb3, .qs${questionNum}lb4, .qs${questionNum}lb5`).forEach(opt => {
//             opt.style.backgroundColor = '';
//             opt.style.border = '';
//             const radio = opt.querySelector('input[type="radio"]');
//             if (radio) radio.checked = false;
//         });
        
//         // Update question state
//         questionStates[questionNum].answered = false;
//         questionStates[questionNum].selectedOption = null;
        
//         // Update counts if needed
//         updateCounts();
//     });
    
//     // Question navigation buttons
//     for (let i = 1; i <= totalQuestions; i++) {
//         document.querySelector(`.ryt-ques-no${i}`).addEventListener('click', function() {
//             updateQuestionState(currentQuestion);
//             showQuestion(i);
//         });
//     }
    
//     // Submit button functionality
//     document.querySelector('.submit-btn').addEventListener('click', function() {
//         if (confirm('Are you sure you want to submit the test?')) {
//             // Calculate final time spent on each question
//             for (let i = 1; i <= totalQuestions; i++) {
//                 if (timers[i].interval) {
//                     clearInterval(timers[i].interval);
//                 }
//                 questionStates[i].timeSpent = timers[i].seconds;
//             }
            
//             // Here you would typically send the data to the server
//             console.log('Test submitted!', questionStates);
//             alert('Test submitted successfully!');
//         }
//     });
    
//     // Helper function to show a specific question
//     function showQuestion(questionNum) {
//         if (questionNum < 1 || questionNum > totalQuestions) return;
        
//         // Pause timer for current question
//         if (timers[currentQuestion].interval) {
//             clearInterval(timers[currentQuestion].interval);
//             timers[currentQuestion].isPaused = true;
//         }
        
//         // Update current question
//         currentQuestion = questionNum;
        
//         // Here you would typically load the actual question content
//         // For this example, we'll just simulate it
//         document.querySelector('.ques1').textContent = `QUESTION ${questionNum} MAIN BODY`;
//         document.querySelector('.qs1').textContent = `QUESTION ${questionNum} SUB QUESTION 1`;
        
//         // Start/resume timer for the new question
//         startTimer(questionNum);
        
//         // Restore any selected options for this question
//         if (questionStates[questionNum].selectedOption) {
//             const selectedLabel = document.querySelector(`.${questionStates[questionNum].selectedOption}`);
//             if (selectedLabel) {
//                 selectedLabel.style.backgroundColor = 'lightgreen';
//                 selectedLabel.style.border = '2px solid black';
//                 const radio = selectedLabel.querySelector('input[type="radio"]');
//                 if (radio) radio.checked = true;
//             }
//         }
//     }
    
//     // Helper function to start/resume a timer for a question
//     function startTimer(questionNum) {
//         if (!timers[questionNum].isPaused) return;
        
//         timers[questionNum].isPaused = false;
//         timers[questionNum].interval = setInterval(function() {
//             timers[questionNum].seconds++;
//             updateTimerDisplay(questionNum);
//         }, 1000);
//     }
    
//     // Helper function to update timer display
//     function updateTimerDisplay(questionNum) {
//         const minutes = Math.floor(timers[questionNum].seconds / 60);
//         const seconds = timers[questionNum].seconds % 60;
//         document.getElementById('timerdisplay').textContent = 
//             `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     }
    
//     // Helper function to update question state when navigating away
//     function updateQuestionState(questionNum) {
//         const hasAnswer = questionStates[questionNum].answered;
        
//         // Update question button appearance
//         const questionBtn = document.querySelector(`.ryt-ques-no${questionNum}`);
        
//         if (hasAnswer) {
//             questionBtn.style.backgroundColor = 'green';
            
//             // Update answered count
//             const answeredCount = Object.values(questionStates).filter(q => q.answered && !q.markedForReview).length;
//             document.getElementById('answrd').textContent = answeredCount;
//         } else {
//             questionBtn.style.backgroundColor = 'red';
            
//             // Update not answered count
//             const notAnsweredCount = Object.values(questionStates).filter(q => !q.answered && !q.markedForReview).length;
//             document.getElementById('n-a').textContent = notAnsweredCount;
//         }
//     }
    
//     // Helper function to update all counts
//     function updateCounts() {
//         const answeredCount = Object.values(questionStates).filter(q => q.answered && !q.markedForReview).length;
//         const mfraCount = Object.values(questionStates).filter(q => q.markedForReview && q.answered).length;
//         const mfrCount = Object.values(questionStates).filter(q => q.markedForReview && !q.answered).length;
//         const notAnsweredCount = Object.values(questionStates).filter(q => !q.answered && !q.markedForReview).length;
        
//         document.getElementById('answrd').textContent = answeredCount;
//         document.getElementById('m-f-r-a').textContent = mfraCount;
//         document.getElementById('m-f-r').textContent = mfrCount;
//         document.getElementById('n-a').textContent = notAnsweredCount;
//     }
    
//     // Add some CSS for the green dot
//     const style = document.createElement('style');
//     style.textContent = `
//         .green-dot {
//             position: absolute;
//             bottom: 2px;
//             right: 2px;
//             width: 8px;
//             height: 8px;
//             background-color: green;
//             border-radius: 50%;
//         }
//         .ryt-ques-no1, .ryt-ques-no2, .ryt-ques-no3, .ryt-ques-no4, .ryt-ques-no5,
//         .ryt-ques-no6, .ryt-ques-no7, .ryt-ques-no8, .ryt-ques-no9, .ryt-ques-no10,
//         .ryt-ques-no11, .ryt-ques-no12, .ryt-ques-no13, .ryt-ques-no14, .ryt-ques-no15,
//         .ryt-ques-no16, .ryt-ques-no17, .ryt-ques-no18, .ryt-ques-no19, .ryt-ques-no20,
//         .ryt-ques-no21, .ryt-ques-no22, .ryt-ques-no23, .ryt-ques-no24, .ryt-ques-no25,
//         .ryt-ques-no26, .ryt-ques-no27, .ryt-ques-no28, .ryt-ques-no29, .ryt-ques-no30 {
//             position: relative;
//         }
//     `;
//     document.head.appendChild(style);
// });