const pool = require("../db");


// GET ALL TRANSACTIONS

exports.getTransactions = async(req,res)=>{

    try{

        const data = await pool.query(
            `
            SELECT *
            FROM transactions
            WHERE user_id=$1
            ORDER BY transaction_date DESC
            `,
            [req.user.id]
        );


        res.json(data.rows);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};



// ADD TRANSACTION

exports.createTransaction = async(req,res)=>{


    try{


        const {
            type,
            amount,
            purpose
        } = req.body;



        if(!["credit","debit"].includes(type)){
            return res.status(400).json({
                message:"Invalid transaction type"
            });
        }



        const result = await pool.query(

            `
            INSERT INTO transactions
            (
            user_id,
            type,
            amount,
            purpose
            )

            VALUES($1,$2,$3,$4)

            RETURNING *
            `,

            [
                req.user.id,
                type,
                amount,
                purpose
            ]

        );


        res.json(result.rows[0]);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};



// DELETE TRANSACTION

exports.deleteTransaction = async(req,res)=>{


    try{


        await pool.query(
            `
            DELETE FROM transactions
            WHERE id=$1
            AND user_id=$2
            `,
            [
                req.params.id,
                req.user.id
            ]
        );


        res.json({
            message:"Deleted"
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};