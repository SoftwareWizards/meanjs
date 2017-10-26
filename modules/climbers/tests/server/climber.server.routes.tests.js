'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Climber = mongoose.model('Climber'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  climber;

/**
 * Climber routes tests
 */
describe('Climber CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Climber
    user.save(function () {
      climber = {
        name: 'Climber name'
      };

      done();
    });
  });

  it('should be able to save a Climber if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Climber
        agent.post('/api/climbers')
          .send(climber)
          .expect(200)
          .end(function (climberSaveErr, climberSaveRes) {
            // Handle Climber save error
            if (climberSaveErr) {
              return done(climberSaveErr);
            }

            // Get a list of Climbers
            agent.get('/api/climbers')
              .end(function (climbersGetErr, climbersGetRes) {
                // Handle Climbers save error
                if (climbersGetErr) {
                  return done(climbersGetErr);
                }

                // Get Climbers list
                var climbers = climbersGetRes.body;

                // Set assertions
                (climbers[0].user._id).should.equal(userId);
                (climbers[0].name).should.match('Climber name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Climber if not logged in', function (done) {
    agent.post('/api/climbers')
      .send(climber)
      .expect(403)
      .end(function (climberSaveErr, climberSaveRes) {
        // Call the assertion callback
        done(climberSaveErr);
      });
  });

  it('should not be able to save an Climber if no name is provided', function (done) {
    // Invalidate name field
    climber.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Climber
        agent.post('/api/climbers')
          .send(climber)
          .expect(400)
          .end(function (climberSaveErr, climberSaveRes) {
            // Set message assertion
            (climberSaveRes.body.message).should.match('Please fill Climber name');

            // Handle Climber save error
            done(climberSaveErr);
          });
      });
  });

  it('should be able to update an Climber if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Climber
        agent.post('/api/climbers')
          .send(climber)
          .expect(200)
          .end(function (climberSaveErr, climberSaveRes) {
            // Handle Climber save error
            if (climberSaveErr) {
              return done(climberSaveErr);
            }

            // Update Climber name
            climber.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Climber
            agent.put('/api/climbers/' + climberSaveRes.body._id)
              .send(climber)
              .expect(200)
              .end(function (climberUpdateErr, climberUpdateRes) {
                // Handle Climber update error
                if (climberUpdateErr) {
                  return done(climberUpdateErr);
                }

                // Set assertions
                (climberUpdateRes.body._id).should.equal(climberSaveRes.body._id);
                (climberUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Climbers if not signed in', function (done) {
    // Create new Climber model instance
    var climberObj = new Climber(climber);

    // Save the climber
    climberObj.save(function () {
      // Request Climbers
      request(app).get('/api/climbers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Climber if not signed in', function (done) {
    // Create new Climber model instance
    var climberObj = new Climber(climber);

    // Save the Climber
    climberObj.save(function () {
      request(app).get('/api/climbers/' + climberObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', climber.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Climber with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/climbers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Climber is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Climber which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Climber
    request(app).get('/api/climbers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Climber with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Climber if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Climber
        agent.post('/api/climbers')
          .send(climber)
          .expect(200)
          .end(function (climberSaveErr, climberSaveRes) {
            // Handle Climber save error
            if (climberSaveErr) {
              return done(climberSaveErr);
            }

            // Delete an existing Climber
            agent.delete('/api/climbers/' + climberSaveRes.body._id)
              .send(climber)
              .expect(200)
              .end(function (climberDeleteErr, climberDeleteRes) {
                // Handle climber error error
                if (climberDeleteErr) {
                  return done(climberDeleteErr);
                }

                // Set assertions
                (climberDeleteRes.body._id).should.equal(climberSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Climber if not signed in', function (done) {
    // Set Climber user
    climber.user = user;

    // Create new Climber model instance
    var climberObj = new Climber(climber);

    // Save the Climber
    climberObj.save(function () {
      // Try deleting Climber
      request(app).delete('/api/climbers/' + climberObj._id)
        .expect(403)
        .end(function (climberDeleteErr, climberDeleteRes) {
          // Set message assertion
          (climberDeleteRes.body.message).should.match('User is not authorized');

          // Handle Climber error error
          done(climberDeleteErr);
        });

    });
  });

  it('should be able to get a single Climber that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Climber
          agent.post('/api/climbers')
            .send(climber)
            .expect(200)
            .end(function (climberSaveErr, climberSaveRes) {
              // Handle Climber save error
              if (climberSaveErr) {
                return done(climberSaveErr);
              }

              // Set assertions on new Climber
              (climberSaveRes.body.name).should.equal(climber.name);
              should.exist(climberSaveRes.body.user);
              should.equal(climberSaveRes.body.user._id, orphanId);

              // force the Climber to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Climber
                    agent.get('/api/climbers/' + climberSaveRes.body._id)
                      .expect(200)
                      .end(function (climberInfoErr, climberInfoRes) {
                        // Handle Climber error
                        if (climberInfoErr) {
                          return done(climberInfoErr);
                        }

                        // Set assertions
                        (climberInfoRes.body._id).should.equal(climberSaveRes.body._id);
                        (climberInfoRes.body.name).should.equal(climber.name);
                        should.equal(climberInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Climber.remove().exec(done);
    });
  });
});
