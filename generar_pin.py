import sys
import random

if __name__ == "__main__":
    user = sys.argv[1] if len(sys.argv) > 1 else input("Ingresa el usuario de YouTube (ej: @carloscelestino889): ")
    
    # Generate a fresh random 3-digit PIN each time
    rand_num = random.randint(100, 999)
    pin = f"RIV{rand_num}"
    
    print("\n==========================================================")
    print(f" 🔑 PIN PRIVADO UNICO PARA {user.upper()}:  {pin}")
    print("==========================================================")
    print(f"Responde en YouTube: Tu PIN único de descarga es: {pin}\n")
