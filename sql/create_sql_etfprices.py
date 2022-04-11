import csv

f = open("insert_tuples.sql", "a")
inputDir = 'ETF prices.csv'
with open(inputDir) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        insert = "insert into etf_measurement values ('"+row[0]+"', TO_DATE('"+row[1]+"', 'yyyy-mm-dd'), ";
        for i in range(2,8):
            if i == 7:
                if row[i] == "":
                    insert += "NULL"
                    break
                else:
                    insert += row[i]
                    break
            if row[i] == "":
                insert += "NULL, "
            else:
                insert += row[i] + ", "
        insert += ');\n'
        f.write(insert)
