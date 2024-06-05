const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const generateOrderId = async () => {
    try {
        const response = await axios.post('https://api.tech.redventures.com.br/orders/generate-id', null, {
            headers: {
                'x-api-key': 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf'
            }
        });

        return response.data.orderId;

    } catch (error) {
        throw error;
    }
};

const insertOrder = async (broth, protein, orderDescription, orderImage) => {
    const orderId = await generateOrderId();

    const orderData = {
        id: orderId,
        brothId: broth,
        proteinId: protein,
        description: orderDescription,
        image: orderImage,
    };

    await supabase
        .from('Orders')
        .insert([orderData])
        .single();

    return orderData;
};

exports.createOrder = async (req, res) => {
    let { brothId, proteinId } = req.body;

    brothId = parseInt(brothId, 10);
    proteinId = parseInt(proteinId, 10);

        try {
        
            if (!brothId || !proteinId) {
                return res.status(400).json({ error: "both brothId and proteinId are required" });
            }
        // Consulta SQL paralela afim de evitar uso de duas funções com mesmo objetivo
        const [brothResponse, proteinResponse] = await Promise.all([
            supabase.from('Broths').select('*').eq('id', brothId).single(),
            supabase.from('Protein').select('*').eq('id', proteinId).single()
        ]);
    
        const { data: brothData, error: brothError } = brothResponse;
        const { data: proteinData, error: proteinError } = proteinResponse;
    

        if (brothError) {
            return res.status(500).json({ error: brothError.message, });
        }
    
        if (proteinError) {
            return res.status(500).json({ error: proteinError.message });
        }

        
    
        let orderImage;

        if (proteinId === 1) {
            orderImage = 'https://maynacm.github.io/RamenGo-Imgs/ChasuRamen.png';
        } else if (proteinId === 2) {
            orderImage = 'https://maynacm.github.io/RamenGo-Imgs/VeggieRamen.png';
        } else if (proteinId === 3) {
            orderImage = 'https://maynacm.github.io/RamenGo-Imgs/karagueRamen.png';
        } else {
            console.log('Imagem relacionada não encontrada, verifique o link ou id da proteina')
        }
    
        const orderDescription = `${brothData.name} and ${proteinData.name} Ramen`;
    
        const orderData = await insertOrder(brothId, proteinId, orderDescription, orderImage);

        const response = {
            id: orderData.id,
            description: orderData.description,
            image: orderData.image
        };
    
        res.status(201).json(response);
    
        } catch (err) {
            res.status(500).json({ error: "could not place order" });
        }
    };
