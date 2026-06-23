from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

#  FIXED VERSION
def hash_password(password: str):
    return pwd_context.hash(password[:72])  # <-- fix here

def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)