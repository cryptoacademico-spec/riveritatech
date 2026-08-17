import sys

# Catalog of YouTube Videos
VIDEOS = {
    "1": {"id": "AzdTR59DhD0", "title": "Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI 🚀"},
    "2": {"id": "DIPPvQ34v8w", "title": "Cómo conectarse a vCenter 9.1 con PowerCLI 🚀"}
}

def calculate_valid_pin(handle, video_id):
    clean = handle.strip().lower().replace('@', '').replace("'", "").replace('"', '')
    if not clean:
        return 'RIV000'
    
    salt = f"{clean}_{video_id}"
    hash_val = 0
    for char in salt:
        hash_val = ((hash_val << 5) - hash_val) + ord(char)
        hash_val &= 0xFFFFFFFF
    
    # 32-bit signed integer conversion
    if hash_val & 0x80000000:
        hash_val = -((~hash_val + 1) & 0xFFFFFFFF)
        
    abs_num = (abs(hash_val) % 900) + 100
    return f"RIV{abs_num}"

if __name__ == "__main__":
    print("\n==========================================================")
    print(" 📹 SELECCIONA EL VIDEO DE YOUTUBE:")
    print(" 1. Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI 🚀")
    print(" 2. Cómo conectarse a vCenter 9.1 con PowerCLI 🚀")
    print("==========================================================")
    
    v_option = sys.argv[2] if len(sys.argv) > 2 else input("Elige la opción del video (1 o 2, por defecto 1): ")
    if v_option not in VIDEOS:
        v_option = "1"
        
    video_info = VIDEOS[v_option]
    
    user = sys.argv[1] if len(sys.argv) > 1 else input("\nIngresa el usuario de YouTube (ej: @carloscelestino889): ")
    
    pin = calculate_valid_pin(user, video_info["id"])
    
    print("\n==========================================================")
    print(f" 🎬 VIDEO: {video_info['title']}")
    print(f" 🔑 PIN PRIVADO UNICO PARA {user.upper()}:  {pin}")
    print("==========================================================")
    print(f"Responde en YouTube: Tu PIN único de descarga es: {pin}\n")
