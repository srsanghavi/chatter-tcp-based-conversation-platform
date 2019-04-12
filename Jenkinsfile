pipeline {
 environment {
   jobBaseName = "${env.JOB_NAME}".split('/').first()
   AWS_DEFAULT_REGION = "us-east-1"
   AWS_ACCESS_KEY_ID = "AKIA2MS5HQUYVLXCTZPI"
   AWS_SECRET_ACCESS_KEY = "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"
 }
 options {
  timeout(time: 10, unit: 'MINUTES') 
  } //option

  agent none
  stages {

   stage("Build and Test") {
     when {
       not {
         branch 'master'
       }
     }
     agent {
      docker {
        image 'maven:3-alpine'
        args '-v m2_repos:/root/.m2'
                } //docker
            } // agent

            stages {

             stage('Build') {
               steps {
                 echo "Building Chatter"
                 sh 'mvn -f Development/Chatter/pom.xml install'
                 echo "Building ChatServer"
                 sh 'mvn -f Development/ChatServer/pom.xml compile'
               }
   } // build
   stage('SonarQube') {
     when {
       not {
         branch 'master'
       }
     }
     steps {
      withSonarQubeEnv('SonarQube') {
        sh 'mvn -f Development/ChatServer/pom.xml clean install'
        sh 'mvn -f Development/ChatServer/pom.xml sonar:sonar -Dsonar.projectKey=${jobBaseName} -Dsonar.projectName=${jobBaseName}'
      }

      sh 'sleep 30'
      timeout(time: 10, unit: 'SECONDS') {
       retry(5) {
        script {
          def qg = waitForQualityGate()
          if (qg.status != 'OK') {
            error "Pipeline aborted due to quality gate failure: ${qg.status}"
          }
        }
      }
    }
  } //steps
} //SONAR
}
} //stage 

stage('Master Branch Tasks') {
  when {
   branch 'master'
 }
 agent any
 steps {
   echo "Building ChatServer"
   sh 'mvn -f Development/ChatServer/pom.xml package -Dmaven.test.skip=true'          

   script {
    def json = readJSON file:'config.json'
    sh 'cd ${WORKSPACE}'
    sh "chmod 400 ${json.server[0].PEM}"
     sh "scp -oStrictHostKeyChecking=no -i ${json.server[0].PEM} Development/ChatServer/target/${json.server[0].JARNAME} ${json.server[0].user}@${json.server[0].DNS}:${json.server[0].directory}"
    sh "ssh -oStrictHostKeyChecking=no -i ${json.server[0].PEM} ${json.server[0].user}@${json.server[0].DNS}  pkill java &"
    sh "ssh -oStrictHostKeyChecking=no -i ${json.server[0].PEM} ${json.server[0].user}@${json.server[0].DNS}  nohup java -jar ${json.server[0].directory}/${json.server[0].JARNAME} >nohup.out 2>&1 &"
                 } //script
               }
             }
} // STAGES


 //post {      

  //SLACK IS CURRENTLY COMMENTED OUT, you will have to add your custom integration. 
  //   success {
  //          slackSend (baseUrl: "https://nu-cs5500.slack.com/services/hooks/jenkins-ci/", token: "gO2JO0o8DG11Syjwl6UDDAQy", channel: "#cs5500-team-XXX-SP19", color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME}")
  //          }
  // failure {  
  //       slackSend (baseUrl: "https://nu-cs5500.slack.com/services/hooks/jenkins-ci/", token: "gO2JO0o8DG11Syjwl6UDDAQy", channel: "#cs5500-team-XXX-SP19", color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME}")
  //        }
  //  }
} //pipeline
