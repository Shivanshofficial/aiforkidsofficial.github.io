"""
    WELCOME TO PAGE GENERATOR 
    
STEP 1 : COPY AND PASTE THIS INTO THE CONSOLE OF THE PAGE

document.querySelectorAll("tr a").forEach((e)=>{console.log(e.innerText)})

=====================================================

STEP 2 : COPY THE OUTPUT OF THE CONSOLE AND PASTE IN bin.txt

==================================================

STEP 3 : CLEAR THE result.txt 

==================================================

STEP 4 : RUN THE help.py FILE (See the steps to Run => below)

open cmd(shared terminal)
TYPE cd THEN PRESS ENTER
IF DIRECTORY IS D:/Hugo/aiforkids THEN PROCEED
TYPE python help.py THEN ENTER


==================================================

STEP 5 : CHECK THE RESULT FILE AND FILTER IT MANUALY

==================================================

STEP 6 : COPY THE result.txt FILE AND PASTE IN cmd terminal (Shared at live share) 

!danger! to be handled carefully else it can create problems

==================================================

"""


file1 = open("bin.txt","r",encoding="utf-8")
fileresult = open("result.txt","a",encoding="utf-8")

print("WELCOME TO  CLASS PAGES GENERATOR MADE BY")
print("--------------LALIT------------------")

className = str( input("enter the class : 6/7/8/9/10 \n: "))
vmNum = str( input("enter the VM Number ( Number in console after VM for ex = 377:1 ) \n: "))
lines = file1.readlines()
for line in lines:
    line = line.replace("1. ","")
    line = line.replace("2. ","")
    line = line.replace("3. ","")
    line = line.replace("4. ","")
    line = line.replace("5. ","")
    line = line.replace("6. ","")
    line = line.replace("7. ","")
    line = line.replace("8. ","")
    line = line.replace("9. ","")
    line = line.replace("10. ","")
    line = line.replace("11. ","")

    line = line.replace("12. ","")
    line = line.replace("13. ","")
    line = line.replace("14. ","")
    line = line.replace("15. ","")
    line = line.replace("16. ","")
    line = line.replace("17. ","")
    line = line.replace("18. ","")
    line = line.replace("19. ","")
    line = line.replace("20. ","")
    line = line.replace("VM"+vmNum,"")
    lineData = "hugo new class-"+className+"/"+line.replace(" ","-").replace("\n","")+ "-class-" + className +"th.html\n"
    lineFinal = lineData.replace("/-","/")
    fileresult.write(lineFinal)