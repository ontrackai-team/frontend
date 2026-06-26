from bson import ObjectId

def clean_mongo(data):
    if isinstance(data, list):
        return [clean_mongo(i) for i in data]

    if isinstance(data, dict):
        return {
            k: clean_mongo(v)
            for k, v in data.items()
        }

    if isinstance(data, ObjectId):
        return str(data)

    return data