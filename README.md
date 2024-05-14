1. The automated tests in the project should be in the Github action that runs whenever code is pushed. This is because the other two ened to be manually executed, so we might forget to do it before merging code. However, with the Github Action, we can ensure that our tests have passed, adding an extra requirement for merging.

2. No, we would want to use unit testing for checking the output of a single function rather than end-to-end testing.



