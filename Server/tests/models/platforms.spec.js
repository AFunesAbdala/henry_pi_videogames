const { platform, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Platform Model' , () => {

    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
    }));
  
    describe('Validators', () => {
  
      beforeEach(() => platform.sync({ force: true }));

      describe('ID', () => {

        it('Should autoincrements the ID' , async () => {
            const createdPlatform1 = await platform.create({ name : "PC"});
            const createdPlatform2 = await platform.create({ name : "Xbox One"});

            expect(createdPlatform1.dataValues.id).to.be.a('number');
            expect(createdPlatform2.dataValues.id).to.be.a('number');
            expect(createdPlatform1.dataValues.id).to.not.equal(createdPlatform2.dataValues.id);
        });

      });
  
      describe('Name', () => {
  
        it('Should throw an error if the property "name" is null' , async () => {
            try {
                await platform.create({ name : null });
            } catch (error) {
                expect(error.name).to.equal('SequelizeValidationError');
            }
        });

        it('Should throw an error if "name" is not unique', async () => {
        
            await platform.create({ name : "Nintendo"});
    
            try {
              await platform.create({ name : "Nintendo"});
            } catch (error) {
              expect(error.name).to.equal('SequelizeUniqueConstraintError');
            }
        });

        it('Should throw work if the property "name" is valid' , async () => {
            const createdGenre = await platform.create({ name : "Play Station 4"})
            expect(createdGenre.dataValues.name).to.equal("Play Station 4")
        });

      });
  
    });
  
});