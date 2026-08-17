import sys

def calculate_valid_pin(handle):
    clean = handle.strip().lower().replace('@', '')
    if not clean:
        return 'RIV000'
    
    hash_val = 0
    for char in clean:
        hash_val = ((hash_val << 5) - hash_val) + ord(char)
        hash_val &= 0xFFFFFFFF
    
    # Handle unsigned 32-bit integer conversion for python
    if hash_val & 0x80000000:
        hash_val = -((~hash_val + 1) & 0xFFFFFFFF)
        
    abs_num = (abs(hash_val) % 900) + 100
    return f"RIV{abs_num}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user = sys.argv[1]
    else:
        user = input("Ingresa el usuario de YouTube (ej: @carloscelestino889): ")
    
    pin = calculate_valid_pin(user)
    print("\n==========================================================")
    print(f" 🔑 PIN PRIVADO PARA {user.upper()}:  {pin}")
    print("==========================================================")
    print(f"Responde en YouTube: 'Tu PIN único de descarga es: {pin}'\n")
