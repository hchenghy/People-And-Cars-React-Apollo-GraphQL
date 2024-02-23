import find from "lodash.find"
import remove from "lodash.remove"

const peopleArray = [
    {
        id: '1',
        firstName: 'Bill',
        lastName: 'Gates'
    },
    {
        id: '2',
        firstName: 'Steve',
        lastName: 'Jobs'
    },
    {
        id: '3',
        firstName: 'Linux',
        lastName: 'Torvalds'
    }
]

const carArray = [
    {
        id: '1',
        year: '2019',
        make: 'Toyota',
        model: 'Corolla',
        price: '40000',
        personId: '1'
    },
    {
        id: '2',
        year: '2018',
        make: 'Lexus',
        model: 'LX 600',
        price: '13000',
        personId: '1'
    },
    {
        id: '3',
        year: '2017',
        make: 'Honda',
        model: 'Civic',
        price: '20000',
        personId: '1'
    },
    {
        id: '4',
        year: '2019',
        make: 'Acura ',
        model: 'MDX',
        price: '60000',
        personId: '2'
    },
    {
        id: '5',
        year: '2018',
        make: 'Ford',
        model: 'Focus',
        price: '35000',
        personId: '2'
    },
    {
        id: '6',
        year: '2017',
        make: 'Honda',
        model: 'Pilot',
        price: '45000',
        personId: '2'
    },
    {
        id: '7',
        year: '2019',
        make: 'Volkswagen',
        model: 'Golf',
        price: '40000',
        personId: '3'
    },
    {
        id: '8',
        year: '2018',
        make: 'Kia',
        model: 'Sorento',
        price: '45000',
        personId: '3'
    },
    {
        id: '9',
        year: '2017',
        make: 'Volvo',
        model: 'XC40',
        price: '55000',
        personId: '3'
    }
]

const typeDefs = `
  type People {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Car {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String!
  }
  
  type PersonWithCars {
    id: String!
    firstName: String!
    lastName: String!
    cars: [Car!]!
  }

  type Query {
    people: [People]
    car: [Car]
    person(id: String!): PersonWithCars
    getCarsByPersonId(personId: String!): [Car]!
  }

  type Mutation {
    addPeople(id:String!, firstName:String!, lastName:String!): People
    updatePeople(id:String!, firstName:String!, lastName:String!): People
    removePeople(id:String!): People
    addCar(id:String!, year:Int!, make:String!, model:String!, price:Float!, personId:String!): Car
    updateCar(id:String!, year:Int!, make:String!, model:String!, price:Float!, personId:String!): Car
    removeCar(id:String!): Car
  }
  `

const resolvers = {
    Query: {
        people: () => peopleArray,
        car: () => carArray,
        getCarsByPersonId: (root, { personId }) => {
            return carArray.filter(car => car.personId === personId);
        },
        person: (root, { id }) => {
            const person = peopleArray.find(person => person.id === id);
            const cars = carArray.filter(car => car.personId === id);
            return { ...person, cars };
        },
    },
    Mutation: {
        addPeople: (root, args) => {
            const newPeople = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
            }
            peopleArray.push(newPeople)

            return newPeople
        },
        updatePeople: (root, args) => {
            const people = find(peopleArray, { id: args.id })
            if (!people) {
                throw new Error("no people")
            }
            people.firstName = args.firstName
            people.lastName = args.lastName

            return people
        },
        removePeople: (root, args) => {
            const removePeople = find(peopleArray, { id: args.id })
            if (!removePeople) {
                throw new Error("no people")
            }
            remove(peopleArray, c => {
                return c.id === removePeople.id
            })
            const removeCarsPerson = remove(carArray, { personId: args.id });

            return removePeople
        },
        addCar: (root, args) => {
            const newCar = {
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId
            }
            carArray.push(newCar)

            return newCar
        },
        updateCar: (root, args) => {
            const car = find(carArray, { id: args.id })
            if (!car) {
                throw new Error("no car")
            }
            car.year = args.year
            car.make = args.make
            car.model = args.model
            car.price = args.price
            car.personId = args.personId

            return car
        },
        removeCar: (root, args) => {
            const removeCar = find(carArray, { id: args.id })
            if (!removeCar) {
                throw new Error("no car")
            }
            remove(carArray, (car) => {
                return car.id === removeCar.id
            })

            return removeCar
        },
    }
}

export { typeDefs, resolvers }