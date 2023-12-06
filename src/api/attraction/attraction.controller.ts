import database from '../../services/database.service';

export async function getAttractions(req:any, res:any) {
    try {
        let attractions= database.getAllItems() 
        // await attractionService.remove(req.params.id)
        res.send({  attractions })
    } catch (err) {
        console.log('Failed to delete attraction', err)
        res.status(500).send({ err: 'Failed to delete attraction' })
    }
}




