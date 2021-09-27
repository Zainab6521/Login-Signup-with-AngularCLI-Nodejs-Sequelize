module.exports = {
    development: {
      username: "ciinhdlstxmzvg",
      password:
        "970f5726ed99b3bf334ef8628479a52eff5f4a278909b50f748d8501c3b30de9",
      database: "dacupuslmmqgde",
      host: "ec2-18-215-44-132.compute-1.amazonaws.com",
      dialect: "postgres",
      dialectOptions: {
        ssl: true,
      },
      port: 5432,
      pool: {
        max: 5,
        min: 0,
        idle: 100000,
        acquire: 50000,
        evict: 50000,
        handleDisconnects: true,
      },
    },
    staging: {
      username: "ciinhdlstxmzvg",
      password:
        "970f5726ed99b3bf334ef8628479a52eff5f4a278909b50f748d8501c3b30de9",
      database: "dacupuslmmqgde",
      host: "ec2-18-215-44-132.compute-1.amazonaws.com",
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      port: 5432,
    },
    secret: {
        'secret': 'any-word-here'
    }
};
