window.utils = window.utils || {};
window.utils.quizService = (function quizService() {

    function arrayToObjectArray(array1, array2) {
        // Convert arrays into cardSet object array
        var objectArray = [];
        if (array1.length !== array2.length || array1.length === 0 || array2.length === 0) {
            return;
        }
        for (var ii = 0; ii < array1.length; ++ii) {
            objectArray.push({ question: array1[ii], answer: array2[ii] });
        }
        return objectArray;
    }

    return {
        readFiles: function ($quizFile, callback) {
            if (!$quizFile.val()) {
                return
            } else if ($quizFile[0].files.length !== 2) {
                return
            }
            var reader = new FileReader(),
                content,
                questionsArray,
                answersArray,
                file1, file2;

            reader.onload = function (event1) {
                content = event1.target.result;
                questionsArray = content.split("\n");
                if (questionsArray[questionsArray.length - 1] === "") {
                    questionsArray = questionsArray.slice(0, questionsArray.length - 1);
                }

                reader.onload = function (event2) {
                    content = event2.target.result;
                    answersArray = content.split("\n");
                    if (answersArray[answersArray.length - 1] === "") {
                        answersArray = answersArray.slice(0, answersArray.length - 1);
                    }

                    $quizFile[0].value = "";
                    callback(arrayToObjectArray(questionsArray, answersArray));
                }

                if ($quizFile[0].files[0].name.toLowerCase().indexOf("answers") !== -1) {
                    reader.readAsText($quizFile[0].files[0]);
                } else {
                    reader.readAsText($quizFile[0].files[1]);
                }
            }

            if ($quizFile[0].files[0].name.toLowerCase().indexOf("questions") !== -1) {
                reader.readAsText($quizFile[0].files[0]);
            } else {
                reader.readAsText($quizFile[0].files[1]);
            }
        },
        createFile: function (text) {
            var data = new Blob([text], { type: 'text/plain' });

            textFile = URL.createObjectURL(data, { oneTimeOnly: true });

            // returns a URL you can use as a href
            return textFile;
        }
    }
})();
