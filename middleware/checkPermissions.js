import { query,pool } from '../db/db.js';



const checkPermissions = (requiredPermission) => {
    return async (req, res, next) => {
        const userId = req.user.id; // Suponiendo que el ID del usuario se almacena en `req.user`

        console.log(userId)
        const query1 = `
            SELECT p.nombre_permiso
            FROM usuario_modulo_permiso mp
            JOIN permisos p ON mp.id_permiso = p.id_permiso
            WHERE mp.id_usuario = ?;
        `;

        try {
            const results = await query(query1, [userId]);

            // Extraer los permisos del resultado de la consulta
            const permissions = results.map(row => row.nombre_permiso);

            // Verificar si el usuario tiene el permiso requerido
            if (permissions.includes(requiredPermission)) {
                return next(); // Si tiene el permiso, continuar al siguiente middleware o controlador
            } else {
                return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error en la consulta' });
        }
    };
};

export default checkPermissions;
