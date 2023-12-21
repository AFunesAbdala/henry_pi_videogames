const { genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Genre Model' , () => {

    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
    }));
  
    describe('Validators', () => {
  
      beforeEach(() => genre.sync({ force: true }));

      describe('ID', () => {

        it('Should autoincrements the ID' , async () => {
            const createdGenre1 = await genre.create({ name : "Action"});
            const createdGenre2 = await genre.create({ name : "Adventure"});

            expect(createdGenre1.dataValues.id).to.be.a('number');
            expect(createdGenre2.dataValues.id).to.be.a('number');
            expect(createdGenre1.dataValues.id).to.not.equal(createdGenre2.dataValues.id);
        });

      });
  
      describe('Name', () => {
  
        it('Should throw an error if the property "name" is null' , async () => {
            try {
                await genre.create({ name : null });
            } catch (error) {
                expect(error.name).to.equal('SequelizeValidationError');
            }
        });

        it('Should throw an error if "name" is not unique', async () => {
        
            await genre.create({ name : "Action"});
    
            try {
              await genre.create({ name : "Action"});
            } catch (error) {
              expect(error.name).to.equal('SequelizeUniqueConstraintError');
            }
        });

        it('Should work if the property "name" is valid' , async () => {
            const createdGenre = await genre.create({ name : "Action"})
            expect(createdGenre.dataValues.name).to.equal("Action")
        });

      });
  
    });
  
});