const express = require('express');
const app = express();
app.use(express.json());

// Log de IP em tempo real para monitorar seus dois celulares
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[CONEXÃO] IP detectado: ${ip}`);
    next();
});

// Rota padrão
app.get('/', (req, res) => {
    res.json({ status: "Online", dev: "João Lucas", server: "Cloud V3" });
});

// Rota que o APK vai chamar para a alteração
app.post('/alterar-apk', (req, res) => {
    res.json({
        success: true,
        mod_status: "injected",
        bypass: "active",
        timestamp: new Date().getTime()
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

